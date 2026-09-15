<?php

namespace App\Models;

use InvalidArgumentException;
use JsonSerializable;

class Cidade implements JsonSerializable
{
    private int $idCidade;
    private string $nome;
    private string $pais;
    private float $latitude;
    private float $longitude;
    private \DateTime $criadoEm;

    public function __construct(
        int $idCidade,
        string $nome,
        string $pais,
        float $latitude,
        float $longitude,
        string $criadoEm
    ) {
        $this->setIdCidade($idCidade);
        $this->setNome($nome);
        $this->setPais($pais);
        $this->setLatitude($latitude);
        $this->setLongitude($longitude);
        $this->setCriadoEm($criadoEm);
    }

    public function getIdCidade(): int
    {
        return $this->idCidade;
    }

    public function setIdCidade(int $value): void
    {
        if ($value <= 0) {
            throw new InvalidArgumentException("idCidade deve ser maior que zero.");
        }

        $this->idCidade = $value;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function setNome(string $value): void
    {
        $nome = trim($value);

        if ($nome === '') {
            throw new InvalidArgumentException("nome não pode ser vazio.");
        }

        $len = mb_strlen($nome);

        if ($len < 2) {
            throw new InvalidArgumentException("nome deve ter pelo menos 2 caracteres.");
        }

        if ($len > 120) {
            throw new InvalidArgumentException("nome deve ter no máximo 120 caracteres.");
        }

        $this->nome = $nome;
    }

    public function getPais(): string
    {
        return $this->pais;
    }

    public function setPais(string $value): void
    {
        $pais = trim($value);

        if (mb_strlen($pais) > 80) {
            throw new InvalidArgumentException("pais deve ter no máximo 80 caracteres.");
        }

        $this->pais = $pais;
    }

    public function getLatitude(): float
    {
        return $this->latitude;
    }

    public function setLatitude(float $value): void
    {
        if ($value < -90 || $value > 90) {
            throw new InvalidArgumentException("latitude deve estar entre -90 e 90.");
        }

        $this->latitude = $value;
    }

    public function getLongitude(): float
    {
        return $this->longitude;
    }

    public function setLongitude(float $value): void
    {
        if ($value < -180 || $value > 180) {
            throw new InvalidArgumentException("longitude deve estar entre -180 e 180.");
        }

        $this->longitude = $value;
    }

    public function getCriadoEm(): \DateTime
    {
        return $this->criadoEm;
    }

    public function setCriadoEm(string $value): void
    {
        $this->criadoEm = new \DateTime($value);
    }

    public function jsonSerialize(): array
    {
        return [
            'idCidade' => $this->getIdCidade(),
            'nome' => $this->getNome(),
            'pais' => $this->getPais(),
            'latitude' => $this->getLatitude(),
            'longitude' => $this->getLongitude(),
            'criadoEm' => $this->getCriadoEm()->format('Y-m-d H:i:s'),
        ];
    }
}