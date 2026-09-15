<?php

namespace App\Models;

use InvalidArgumentException;
use JsonSerializable;

class Clima implements JsonSerializable
{
    private int $idClima;
    private int $cidadeId;
    private float $temperatura;
    private string $descricao;
    private int $umidade;
    private \DateTime $consultadoEm;

    public function __construct(
        int $idClima,
        int $cidadeId,
        float $temperatura,
        string $descricao,
        int $umidade,
        string $consultadoEm
    ) {
        $this->setIdClima($idClima);
        $this->setCidadeId($cidadeId);
        $this->setTemperatura($temperatura);
        $this->setDescricao($descricao);
        $this->setUmidade($umidade);
        $this->setConsultadoEm($consultadoEm);
    }

    public function getIdClima(): int
    {
        return $this->idClima;
    }

    public function setIdClima(int $value): void
    {
        if ($value <= 0) {
            throw new InvalidArgumentException("idClima deve ser maior que zero.");
        }

        $this->idClima = $value;
    }

    public function getCidadeId(): int
    {
        return $this->cidadeId;
    }

    public function setCidadeId(int $value): void
    {
        if ($value <= 0) {
            throw new InvalidArgumentException("cidadeId deve ser maior que zero.");
        }

        $this->cidadeId = $value;
    }

    public function getTemperatura(): float
    {
        return $this->temperatura;
    }

    public function setTemperatura(float $value): void
    {
        if ($value < -100 || $value > 60) {
            throw new InvalidArgumentException("temperatura fora de uma faixa realista (-100 a 60).");
        }

        $this->temperatura = $value;
    }

    public function getDescricao(): string
    {
        return $this->descricao;
    }

    public function setDescricao(string $value): void
    {
        $descricao = trim($value);

        if ($descricao === '') {
            throw new InvalidArgumentException("descricao não pode ser vazia.");
        }

        if (mb_strlen($descricao) > 150) {
            throw new InvalidArgumentException("descricao deve ter no máximo 150 caracteres.");
        }

        $this->descricao = $descricao;
    }

    public function getUmidade(): int
    {
        return $this->umidade;
    }

    public function setUmidade(int $value): void
    {
        if ($value < 0 || $value > 100) {
            throw new InvalidArgumentException("umidade deve estar entre 0 e 100.");
        }

        $this->umidade = $value;
    }

    public function getConsultadoEm(): \DateTime
    {
        return $this->consultadoEm;
    }

    public function setConsultadoEm(string $value): void
    {
        $this->consultadoEm = new \DateTime($value);
    }

    public function jsonSerialize(): array
    {
        return [
            'idClima' => $this->getIdClima(),
            'cidadeId' => $this->getCidadeId(),
            'temperatura' => $this->getTemperatura(),
            'descricao' => $this->getDescricao(),
            'umidade' => $this->getUmidade(),
            'consultadoEm' => $this->getConsultadoEm()->format('Y-m-d H:i:s'),
        ];
    }
}