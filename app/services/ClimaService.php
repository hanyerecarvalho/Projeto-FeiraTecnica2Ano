<?php

namespace App\Services;

use App\Models\Cidade;
use App\Models\Clima;
use App\Models\ClimaRepository;

class ClimaService
{
    private ClimaRepository $climaRepository;
    private string $apiKey;
    private int $minutosCacheValido = 30;

    public function __construct(ClimaRepository $climaRepositoryDependency, string $apiKey)
    {
        $this->climaRepository = $climaRepositoryDependency;
        $this->apiKey = $apiKey;
    }

    public function buscarClima(Cidade $cidade): ?Clima
    {
        error_log("🟣 ClimaService::buscarClima({$cidade->getNome()})");

        // 1. Verifica se já existe um clima salvo pra essa cidade
        $climaSalvo = $this->climaRepository->buscarMaisRecentePorCidadeId($cidade->getIdCidade());

        // 2. Se existe e ainda está "fresco", devolve ele direto (sem gastar chamada de API)
        if ($climaSalvo !== null && !$this->cacheExpirou($climaSalvo)) {
            return $climaSalvo;
        }

        // 3. Cache não existe ou expirou -> consulta a API externa
        $dadosApi = $this->consultarApiExterna($cidade);

        if ($dadosApi === null) {
            // Se a API falhar mas ainda tiver um clima antigo salvo, melhor devolver ele
            // do que devolver nada pro usuário.
            return $climaSalvo;
        }

        // 4. Salva o novo clima no banco e devolve
        return $this->climaRepository->salvar(
            $cidade->getIdCidade(),
            $dadosApi['temperatura'],
            $dadosApi['descricao'],
            $dadosApi['umidade']
        );
    }

    private function cacheExpirou(Clima $clima): bool
    {
        $agora = new \DateTime();
        $diferenca = $agora->getTimestamp() - $clima->getConsultadoEm()->getTimestamp();
        $diferencaEmMinutos = $diferenca / 60;

        return $diferencaEmMinutos > $this->minutosCacheValido;
    }

    private function consultarApiExterna(Cidade $cidade): ?array
    {
        $url = "https://api.openweathermap.org/data/2.5/weather?"
            . http_build_query([
                'lat' => $cidade->getLatitude(),
                'lon' => $cidade->getLongitude(),
                'appid' => $this->apiKey,
                'units' => 'metric',
                'lang' => 'pt_br',
            ]);

        $resposta = @file_get_contents($url);

        if ($resposta === false) {
            error_log("⚠️ Erro ao consultar clima para: {$cidade->getNome()}");
            return null;
        }

        $dados = json_decode($resposta, true);

        if (!isset($dados['main']) || !isset($dados['weather'][0])) {
            return null;
        }

        return [
            'temperatura' => (float) $dados['main']['temp'],
            'descricao' => $dados['weather'][0]['description'],
            'umidade' => (int) $dados['main']['humidity'],
        ];
    }
}