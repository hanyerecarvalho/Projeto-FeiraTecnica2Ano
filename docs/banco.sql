create database feira_tecnica;
use feira_tecnica;

CREATE TABLE cidades (
    idCidade INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    pais VARCHAR(80),
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE climas (
    idClimas INT AUTO_INCREMENT PRIMARY KEY,
    cidade_id INT NOT NULL,
    temperatura DECIMAL(5,2),
    descricao VARCHAR(150),
    umidade INT,
    consultado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cidade_id) REFERENCES cidades(idCidade)
);

