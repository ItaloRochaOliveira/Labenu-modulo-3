-- Active: 1680698979514@@127.0.0.1@3306

-- Práticas
--Crie o código SQL estruturando as tabelas da prática 1

--Popule a tabela users com 2 itens

--Popule a tabela phones com 3 itens

--Crie a query de consulta com junção das duas tabelas
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL
);

CREATE TABLE phones (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    user_id TEXT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (id, name, email, password)
VALUES
    ("u001", "it", "it@gmail.com", "aaaaaa"),
    ("u002", "it2", "it2@gmail.com", "aaaaaa");
SELECT * FROM users;

INSERT INTO phones(id, phone_number, user_id)
VALUES
    ("p001", "554002-8922", "u001"),
    ("p002", "551289-8638", "u001"),
    ("p003", "5598378-8473", "u002");


SELECT users.id ,users.name, phones.phone_number
FROM users
INNER JOIN phones
ON phones.user_id = users.id
;

----------------------------------------------------
--PRATICA 3
CREATE TABLE licenses (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    regiister_number INTEGER NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE drivers (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    license_id TEXT UNIQUE NOT NULL,
    FOREIGN KEY (license_id) REFERENCES licenses(id)
);

INSERT INTO licenses (id, regiister_number, category)
VALUES
    ('l001', "1321897312937", "A"),
    ("l002", "3740214809181", "B");
INSERT INTO drivers (id, name, email, password, license_id)
VALUES
    ("u001", "it", "it@gmail.com", "aaaaaa", "l001"),
    ("u002", "it2", "it2@gmail.com", "aaaaaa", "l002");
SELECT
    drivers.id,
    drivers.name,
    drivers.email,
    drivers.license_id,
    licenses.regiister_number
FROM drivers
INNER JOIN licenses
ON drivers.license_id = licenses.id;

-------------------------------------------------------------
--FIXAÇÃO
CREATE TABLE album(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    autor TEXT NOT NULL,
    lancamento TEXT NOT NULL
);

CREATE TABLE musicas(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    duracao INTEGER NOT NULL,
    album_id TEXT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album(id)
);

INSERT INTO album (id, name, autor, lancamento)
VALUES
    ("a001", "The Story Begins", "Twice", "2015"),
    ("a002", "New Jeans", "New Jeans", "2022");

INSERT INTO musicas (id, name, duracao, album_id)
VALUES 
    ("m001", "Like Ohh-Ahh", 2.46, "a001"),
    ("m002", "Do It Again", 3.27, "a001"),
    ("m003", "Hype Boy", 3, "a002"),
    ("m004", "Attention", 3.01, "a002");

SELECT
    musicas.id,
    musicas.name,
    musicas.duracao,
    musicas.album_id, 
    album.name, 
    album.lancamento
FROM musicas
INNER JOIN album
ON musicas.album_id = album.id;