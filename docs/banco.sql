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
SET SQL_SAFE_UPDATES = 0;

DELETE FROM climas;
DELETE FROM cidades;

ALTER TABLE cidades AUTO_INCREMENT = 1;

INSERT INTO cidades
(nome, pais, latitude, longitude, habitantes, criado_em)
VALUES
('Brasília', 'Brasil', -15.7939, -47.8828, 2996899, NOW()),
('Buenos Aires', 'Argentina', -34.6037, -58.3816, 3121707, NOW()),
('Santiago', 'Chile', -33.4489, -70.6693, 6726045, NOW()),
('Lima', 'Peru', -12.0464, -77.0428, 10580241, NOW()),
('Bogotá', 'Colômbia', 4.711, -74.0721, 7876000, NOW()),
('Montevidéu', 'Uruguai', -34.9011, -56.1645, 1302737, NOW()),
('Washington, D.C.', 'Estados Unidos', 38.9072, -77.0369, 702250, NOW()),
('Nova York', 'Estados Unidos', 40.7128, -74.006, 8478072, NOW()),
('Los Angeles', 'Estados Unidos', 34.0522, -118.2437, 3878704, NOW()),
('Ottawa', 'Canadá', 45.4215, -75.6972, 1146780, NOW()),
('Cidade do México', 'México', 19.4326, -99.1332, 9209944, NOW()),
('Londres', 'Reino Unido', 51.5074, -0.1278, 9089736, NOW()),
('Paris', 'França', 48.8566, 2.3522, 2047602, NOW()),
('Madri', 'Espanha', 40.4168, -3.7038, 3429910, NOW()),
('Lisboa', 'Portugal', 38.7223, -9.1393, 575739, NOW()),
('Roma', 'Itália', 41.9028, 12.4964, 2829958, NOW()),
('Berlim', 'Alemanha', 52.52, 13.405, 3669491, NOW()),
('Moscou', 'Rússia', 55.7558, 37.6173, 14524753, NOW()),
('Atenas', 'Grécia', 37.9838, 23.7275, 3154200, NOW()),
('Amsterdã', 'Países Baixos', 52.3676, 4.9041, 1235985, NOW()),
('Viena', 'Áustria', 48.2082, 16.3738, 2031326, NOW()),
('Tóquio', 'Japão', 35.6762, 139.6503, 37435200, NOW()),
('Pequim', 'China', 39.9042, 116.4074, 17013303, NOW()),
('Seul', 'Coreia do Sul', 37.5665, 126.978, 9962400, NOW()),
('Nova Délhi', 'Índia', 28.6139, 77.209, 29399100, NOW()),
('Bangkok', 'Tailândia', 13.7563, 100.5018, 11107000, NOW()),
('Singapura', 'Singapura', 1.3521, 103.8198, 6081000, NOW()),
('Dubai', 'Emirados Árabes Unidos', 25.2048, 55.2708, 3564000, NOW()),
('Istambul', 'Turquia', 41.0082, 28.9784, 15014763, NOW()),
('Cairo', 'Egito', 30.0444, 31.2357, 21750000, NOW()),
('Cidade do Cabo', 'África do Sul', -33.9249, 18.4241, 4615000, NOW()),
('Nairóbi', 'Quênia', -1.2921, 36.8219, 5119000, NOW()),
('Marrakech', 'Marrocos', 31.6295, -7.9811, 1070000, NOW()),
('Canberra', 'Austrália', -35.2809, 149.13, 484630, NOW()),
('Sydney', 'Austrália', -33.8688, 151.2093, 5638830, NOW()),
('Auckland', 'Nova Zelândia', -36.8509, 174.7645, 1607000, NOW());

ALTER TABLE climas
    ADD COLUMN sensacao_termica DECIMAL(5,2) NULL AFTER umidade,
    ADD COLUMN fuso_horario INT NULL AFTER sensacao_termica;
    
ALTER TABLE cidades
ADD COLUMN habitantes INT NULL;