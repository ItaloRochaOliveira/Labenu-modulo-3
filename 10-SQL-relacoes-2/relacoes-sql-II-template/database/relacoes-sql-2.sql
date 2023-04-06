-- Active: 1680778983761@@127.0.0.1@3306

-- Práticas

--PRÁTICA 1: 
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES 
    ("u001", "it", "it@gmail.com", "1832987319", DATETIME("now", "localtime")),
    ("u002", "it2", "it2@gmail.com", "1832987319", DATETIME("now", "localtime")),
    ("u003", "it3", "it3@gmail.com", "1832987319", DATETIME("now", "localtime"));

SELECT * FROM users;

CREATE TABLE fallows(
    follower_id TEXT NOT NULL,
    followed_id TEXT NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (followed_id) REFERENCES users(id)
);

--PRÁTICA 2: 
INSERT INTO fallows(follower_id,  followed_id)
VALUES 
    ("u001", "u002"),
    ("u001", "u003"),
    ("u002", "u001");

SELECT * FROM fallows;

SELECT 
    users.id as userId,
    users.name,
    users.created_at,
    fallows.followed_id as seguindo
FROM users 
INNER JOIN fallows
ON fallows.follower_id = users.id;

SELECT
    users.id as userId,
    users.name,
    users.created_at,
    fallows.follower_id as seguidor
FROM users
INNER JOIN fallows
ON fallows.followed_id = users.id;

--PRÁTICA 3: 
SELECT 
    users.id as userId,
    users.name,
    users.created_at,
    fallows.followed_id as seguindo
FROM users 
LEFT JOIN fallows
ON fallows.follower_id = users.id;

SELECT 
    users.id as userId,
    users.name,
    users.created_at,
    fallows.followed_id as seguindo,
    userFallowed.name as nameSeguidor
FROM users 
LEFT JOIN fallows
ON fallows.follower_id = users.id
LEFT JOIN users as userFallowed
ON fallows.followed_id = userFallowed.id;

--FIXAÇÃO

CREATE TABLE caracter(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE artefatos(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE caracter_artefato(
    caracter_id TEXT NOT NULL,
    artefato_id TEXT NOT NULL,
    FOREIGN KEY (caracter_id) REFERENCES caracter(id),
    Foreign Key (artefato_id) REFERENCES artefatos(id)
);

INSERT INTO caracter
VALUES
    ("c0001", "qiqi"),
    ("c002", "xinqin"),
    ("c003", "nahida"),
    ("c004", "yanfei");

INSERT INTO caracter
VALUES("c005", "baizhu");

INSERT INTO artefatos 
VALUES 
    ("a001", "selo"),
    ("a002", "trupe"),
    ("a003", "flor do paraiso");

INSERT INTO caracter_artefato
VALUES
    ("c0001", "a001"),
    ("c002", "a001"),
    ("c003", "a002"),
    ("c003", "a003"),
    ("c004", "a002");

SELECT 
    caracter.id as idUser,
    caracter.name,
    caracter_artefato.artefato_id as idArtefato,
    artefatos.name
FROM caracter
LEFT JOIN caracter_artefato
ON caracter_artefato.caracter_id = caracter.id
LEFT join artefatos
ON caracter_artefato.artefato_id = artefatos.id;

