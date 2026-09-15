<?php

namespace App\Controllers;

use App\Services\CidadeService;
use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CityController
{
    private CidadeService $cidadeService;

    public function __construct(CidadeService $cidadeServiceDependency)
    {
        $this->cidadeService = $cidadeServiceDependency;
    }

    public function buscarPorNome(Request $request, Response $response, array $args): Response
    {
        $nome = $args['nome'] ?? '';

        try {
            $cidade = $this->cidadeService->buscarCidade($nome);
        } catch (InvalidArgumentException $e) {
            return $this->jsonResponse($response, ['erro' => $e->getMessage()], 400);
        } catch (\Throwable $e) {
            error_log("🔴 CityController::buscarPorNome - " . $e->getMessage());
            return $this->jsonResponse($response, ['erro' => 'Erro interno ao buscar cidade.'], 500);
        }

        if ($cidade === null) {
            return $this->jsonResponse($response, ['erro' => "Cidade '{$nome}' não encontrada."], 404);
        }

        return $this->jsonResponse($response, $cidade, 200);
    }

    private function jsonResponse(Response $response, $dados, int $status): Response
    {
        $response->getBody()->write(json_encode($dados, JSON_UNESCAPED_UNICODE));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}