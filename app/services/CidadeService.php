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

        $cidade = $this->cidadeRepository->buscarPorNome($nome);

        if ($cidade !== null) {
            return $cidade;
        }

        $dadosApi = $this->consultarApiExterna($nome);

        if ($dadosApi === null) {
            return null;
        }

        return $this->cidadeRepository->salvar(
            $dadosApi['nome'],
            $dadosApi['pais'],
            $dadosApi['latitude'],
            $dadosApi['longitude'],
            $dadosApi['habitantes']
        );
    }


    public function buscarSugestoes(string $nome): array
    {
        $nome = trim($nome);

        if (mb_strlen($nome) < 2) {
            return [];
        }

        $url = "https://nominatim.openstreetmap.org/search?"
            . http_build_query([
                'q' => $nome,
                'format' => 'json',
                'addressdetails' => 1,
                'extratags' => 1,
                'limit' => 2,
                'featuretype' => 'city',
            ]);

        $contexto = stream_context_create([
            'http' => [
                'header' => "User-Agent: FeiraTecnicaApp/1.0\r\n",
                'timeout' => 5,
            ],
        ]);

        $resposta = @file_get_contents($url, false, $contexto);

        if ($resposta === false) {
            error_log("⚠️ Erro ao consultar sugestões para: {$nome}");
            return [];
        }

        $dados = json_decode($resposta, true);

        if (!is_array($dados)) {
            return [];
        }

        return array_values(array_filter(array_map(
            static function ($resultado): ?array {
                if (!is_array($resultado)) {
                    return null;
                }

                $nomeCidade = $resultado['address']['city']
                    ?? $resultado['address']['town']
                    ?? $resultado['address']['village']
                    ?? '';

                if ($nomeCidade === '') {
                    return null;
                }

                if (!isset($resultado['display_name'], $resultado['lat'], $resultado['lon'], $resultado['address']['country'])) {
                    return null;
                }

                return [
                    'nome' => $nomeCidade,
                    'pais' => $resultado['address']['country'] ?? '',
                    'latitude' => (float) $resultado['lat'],
                    'longitude' => (float) $resultado['lon'],
                    'habitantes' => isset($resultado['extratags']['population'])
                        ? (int) $resultado['extratags']['population']
                        : null,
                ];
            },
            $dados
        )));
    }


    private function consultarApiExterna(string $nome): ?array
    {
        $url = "https://nominatim.openstreetmap.org/search?"
            . http_build_query([
                'q' => $nome,
                'format' => 'json',
                'extratags' => 1,
                'addressdetails' => 1,
                'limit' => 1,
            ]);

        $contexto = stream_context_create([
            'http' => [
                'header' => "User-Agent: FeiraTecnicaApp/1.0\r\n",
                'timeout' => 5,
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
            'habitantes' => isset($resultado['extratags']['population'])
                ? (int) $resultado['extratags']['population']
                : null,
        ];
    }
}