<?php

namespace App\Models;

use App\Config\Database;
use PDO;

class CidadeRepository
{
    public function buscarPorNome(string $nome): ?Cidade
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM cidades WHERE nome = :nome LIMIT 1");
        $stmt->execute(['nome' => $nome]);
        $dados = $stmt->fetch();

        if (!$dados) {
            return null;
        }

        return $this->mapear($dados);
    }

    public function buscarPorId(int $id): ?Cidade
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM cidades WHERE idCidade = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $dados = $stmt->fetch();

        if (!$dados) {
            return null;
        }

        return $this->mapear($dados);
    }

    public function salvar(string $nome, string $pais, float $latitude, float $longitude): Cidade
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare(
            "INSERT INTO cidades (nome, pais, latitude, longitude) VALUES (:nome, :pais, :lat, :lon)"
        );
        $stmt->execute([
            'nome' => $nome,
            'pais' => $pais,
            'lat' => $latitude,
            'lon' => $longitude,
        ]);

        $id = (int) $pdo->lastInsertId();

        return $this->buscarPorId($id);
    }

    private function mapear(array $dados): Cidade
    {
        return new Cidade(
            (int) $dados['idCidade'],
            $dados['nome'],
            $dados['pais'],
            (float) $dados['latitude'],
            (float) $dados['longitude'],
            $dados['criado_em']
        );
    }
}