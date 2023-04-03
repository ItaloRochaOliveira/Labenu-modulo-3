-- Active: 1680526886361@@127.0.0.1@3306

CREATE TABLE books (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    page_count INTEGER NULL,
    price REAL NOT NULL
);

SELECT * FROM books;

DROP TABLE books;

-- PRATICA GUIADA 3

-- POPULAR TABELA

INSERT INTO books(id, name, author, page_count, price)
    VALUES
        ("8503012928", "O Quize", "Rachel de Queiroz", 208, 24.95),
        ("8578887239", "Dom Casmurro", "Machado de Assis", null, 46.77);


--Editar linha 2
UPDATE books
    SET price = 30.02 --Vê a coluna
    WHERE id = "8578887239"; -- Vê a linha, se não tiver vai editar todas

--Deletar uma linha

DELETE FROM books WHERE id = "8503012928"