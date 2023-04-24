-- Active: 1682356210234@@127.0.0.1@3306

CREATE TABLE super_heroes (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    power INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL 
);

CREATE TABLE category(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL 
);

INSERT INTO category 
VALUES 
    ("c001", "telepathy"),
    ("c002", "strong");

CREATE TABLE heroes_category (
    id_heroe TEXT UNIQUE NOT NULL,
    id_category TEXT NOT NULL,
    Foreign Key (id_heroe) REFERENCES super_heroes(id),
    Foreign Key (id_category) REFERENCES category(id)
);

INSERT INTO heroes_category
    VALUES("h001", "c002");

SELECT * FROM heroes_category;

DROP Table heroes_category;

