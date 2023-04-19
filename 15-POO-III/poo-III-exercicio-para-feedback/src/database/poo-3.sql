-- Active: 1681920457462@@127.0.0.1@3306

CREATE TABLE super_heroes (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    power INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL 
);

SELECT * FROM super_heroes;