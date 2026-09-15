<?php

namespace App\Models;

use App\Config\Database;
use PDO;

class ClimaRepository
{
    public function buscarMaisRecentePorCidadeId(int $cidadeId): ?Clima
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare(
            "SELECT * FROM climas WHERE cidade_id = :id ORDER BY consultado_em DESC LIMIT 1"
        );
        $stmt->execute(['id' => $cidadeId]);
        $dados = $stmt->fetch();

        if (!$dados) {
            return null;
        }

        return $this->mapear($dados);
    }

    public function salvar(int $cidadeId, float $temperatura, string $descricao, int $umidade): Clima
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare(
            "INSERT INTO climas (cidade_id, temperatura, descricao, umidade) VALUES (:cid, :temp, :desc, :umid)"
        );
        $stmt->execute([
            'cid' => $cidadeId,
            'temp' => $temperatura,
            'desc' => $descricao,
            'umid' => $umidade,
        ]);

        $id = (int) $pdo->lastInsertId();

        $stmt = $pdo->prepare("SELECT * FROM climas WHERE idClimas = :id");
        $stmt->execute(['id' => $id]);

        return $this->mapear($stmt->fetch());
    }

    private function mapear(array $dados): Clima
    {
        return new Clima(
            (int) $dados['idClimas'],
            (int) $dados['cidade_id'],
            (float) $dados['temperatura'],
            $dados['descricao'],
            (int) $dados['umidade'],
            $dados['consultado_em']
        );
    }
}