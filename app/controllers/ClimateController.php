<?php

namespace App\Controllers;

use App\Services\CidadeService;
use App\Services\ClimaService;
use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ClimateController
{
    private CidadeService $cidadeService;
    private ClimaService $climaService;

    public function __construct(CidadeService $cidadeServiceDependency, ClimaService $climaServiceDependency)
    {
        $this->cidadeService = $cidadeServiceDependency;
        $this->climaService = $climaServiceDependency;
    }

    public function buscarClima(Request $request, Response $response, array $args): Response
    {
        $nomeCidade = $args['cidade'] ?? '';

        try {
            // Primeiro precisamos da cidade (com lat/lon) pra poder consultar o clima dela
            $cidade = $this->cidadeService->buscarCidade($nomeCidade);

            if ($cidade === null) {
                return $this->jsonResponse($response, ['erro' => "Cidade '{$nomeCidade}' não encontrada."], 404);
            }

            $clima = $this->climaService->buscarClima($cidade);
        } catch (InvalidArgumentException $e) {
            return $this->jsonResponse($response, ['erro' => $e->getMessage()], 400);
        } catch (\Throwable $e) {
            error_log("🔴 ClimateController::buscarClima - " . $e->getMessage());
            return $this->jsonResponse($response, ['erro' => 'Erro interno ao buscar clima.'], 500);
        }

        if ($clima === null) {
            return $this->jsonResponse($response, ['erro' => "Não foi possível obter o clima de '{$nomeCidade}'."], 502);
        }

        return $this->jsonResponse($response, [
            'cidade' => $cidade,
            'clima' => $clima,
        ], 200);
    }

    private function jsonResponse(Response $response, $dados, int $status): Response
    {
        $response->getBody()->write(json_encode($dados, JSON_UNESCAPED_UNICODE));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}