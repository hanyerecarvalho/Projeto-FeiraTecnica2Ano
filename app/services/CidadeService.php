<?php

namespace App\Services;

use App\Models\Cidade;
use App\Models\CidadeRepository;

class CidadeService
{
    private CidadeRepository $cidadeRepository;

    public function __construct(CidadeRepository $cidadeRepositoryDependency)
    {
        $this->cidadeRepository = $cidadeRepositoryDependency;
    }

    public function buscarCidade(string $nome): ?Cidade
    {
        error_log("🟣 CidadeService::buscarCidade({$nome})");

        // 1. Tenta achar no banco primeiro
        $cidade = $this->cidadeRepository->buscarPorNome($nome);

        if ($cidade !== null) {
            return $cidade;
        }

        // 2. Não achou no banco -> busca na API externa
        $dadosApi = $this->consultarApiExterna($nome);

        if ($dadosApi === null) {
            return null;
        }

        // 3. Salva no banco e devolve o objeto já pronto
        return $this->cidadeRepository->salvar(
            $dadosApi['nome'],
            $dadosApi['pais'],
            $dadosApi['latitude'],
            $dadosApi['longitude']
        );
    }

    private function consultarApiExterna(string $nome): ?array
    {
        $url = "https://nominatim.openstreetmap.org/search?"
            . http_build_query([
                'q' => $nome,
                'format' => 'json',
                'addressdetails' => 1,
                'limit' => 1,
            ]);

        $contexto = stream_context_create([
            'http' => [
                'header' => "User-Agent: FeiraTecnicaApp/1.0\r\n",
            ],
        ]);

        $resposta = @file_get_contents($url, false, $contexto);

        if ($resposta === false) {
            error_log("⚠️ Erro ao consultar API externa para: {$nome}");
            return null;
        }

        $dados = json_decode($resposta, true);

        if (empty($dados) || !isset($dados[0])) {
            return null;
        }

        $resultado = $dados[0];

        return [
            'nome' => $nome,
            'pais' => $resultado['address']['country'] ?? '',
            'latitude' => (float) $resultado['lat'],
            'longitude' => (float) $resultado['lon'],
        ];
    }
}