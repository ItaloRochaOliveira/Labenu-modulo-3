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

DELETE FROM books WHERE id = "8503012928";


--CRIAR TABELA
CREATE TABLE tarefas(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    tarefa TEXT NOT NULL,
    no_tempo TEXT NOT NULL,
    completo INTEGER NOT NULL
);

--EXCLUIR TABELA
DROP TABLE tarefas;


--MOSTRAR TABELA
SELECT * FROM tarefas;


-- POPULAR TABELA
INSERT INTO tarefas(id, tarefa, no_tempo, completo)
    VALUES 
        ("0", "Completar projeto", "1 semana", 0),
        ("1", "Completar projeto Front", "2 semanas", 1),
        ("2", "Ir ao dentista", "3 semana", 0);

--ATUALIZAR UM ITEM DE UMA LINHA DA TABELA
UPDATE tarefas
    SET completo = 1
    WHERE id = "0";

--DELETAR UMA LINHA DA TABELA
DELETE FROM tarefas
    WHERE id = "0";