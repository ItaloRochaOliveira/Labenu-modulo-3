import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// PRATICA GUIADA 1
app.get("/bands", async (req: Request, res: Response) => {
  try {
    const results = await db.raw(`
    SELECT * FROM bands;
    `);

    res.status(200).send(results);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//PRÁTICA 2
app.post("/bands", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;

    if (id !== undefined) {
      if (!id.length) {
        res.status(400);
        throw new Error("é necessário escrever algo");
      }
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("o id é necessario ser string");
      }
    }
    if (name !== undefined) {
      if (!name.length) {
        res.status(400);
        throw new Error("é necessário escrever algo");
      }
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("o name é necessario ser string");
      }
    }

    const idExist = await db.raw(`
        SELECT * FROM bands
        WHERE id = ${id};
    `);

    if (idExist.length) {
      res.status(400);
      throw new Error("id já existente, tente outro.");
    }

    await db.raw(`
    INSERT INTO bands(id, name)
        VALUES ("${id}", "${name}");
    `);

    res.status(201).send("Banda criada com sucesso!");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//PRÁTICA 3

app.put("/bands/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newName = req.body.name;

    if (id !== undefined) {
      if (!id.length) {
        res.status(400);
        throw new Error("é necessário escrever algo");
      }
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("o id é necessario ser string");
      }
    }
    if (newName !== undefined) {
      if (!newName.length) {
        res.status(400);
        throw new Error("é necessário escrever algo");
      }
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("o newName é necessario ser string");
      }
    }

    const [band] = await db.raw(`
          SELECT * FROM bands
          WHERE id = ${id};
      `);

    if (!band) {
      res.status(400);
      throw new Error("id é inexistente, tente um existente.");
    }

    await db.raw(`
    UPDATE bands
    SET name = "${newName || band.name}"
    WHERE id = ${id};`);

    res.status(201).send("Atualizado com sucesso.");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//EXERCICIO DE FIXAÇÃO
app.get("/songs", async (req: Request, res: Response) => {
  try {
    const results = await db.raw(`
      SELECT * FROM songs;
      `);

    res.status(200).send(results);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/songs", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const bandId = req.body.bandId as string;
    // const band = req.body.band as string;

    if (id !== undefined) {
      if (!id.length) {
        res.status(400);
        throw new Error("é necessário escrever algo");
      }
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("o id é necessario ser string");
      }
    }
    if (name !== undefined) {
      if (!name.length) {
        res.status(400);
        throw new Error("é necessário escrever algo");
      }
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("o name é necessario ser string");
      }
    }
    if (bandId !== undefined) {
      if (!bandId.length) {
        res.status(400);
        throw new Error("é necessário escrever algo");
      }
      if (typeof bandId !== "string") {
        res.status(400);
        throw new Error("o bandId é necessario ser string");
      }
    }

    // const [bandId] = await db.raw(`
    //     SELECT id FROM bands
    //     WHERE name = "${band}"
    // `);
    // console.log(bandId.id);

    const idExist = await db.raw(`
          SELECT * FROM songs
          WHERE id = ${id};
      `);

    if (idExist.length) {
      res.status(400);
      throw new Error("id já existente, tente outro.");
    }

    await db.raw(`
      INSERT INTO songs(id, name, band_id)
          VALUES ("${id}", "${name}", "${bandId}");
      `);

    res.status(201).send("música criada com sucesso!");
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
