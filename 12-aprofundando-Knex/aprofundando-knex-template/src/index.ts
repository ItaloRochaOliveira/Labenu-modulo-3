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

app.get("/bands", async (req: Request, res: Response) => {
  try {
    // const result = await db.select("*" ou "id, name").from("bands");
    //ou
    const result = await db("bands");

    res.status(200).send(result);
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

app.post("/bands", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' inválido, deve ser string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' inválido, deve ser string");
    }

    if (id.length < 1 || name.length < 1) {
      res.status(400);
      throw new Error("'id' e 'name' devem possuir no mínimo 1 caractere");
    }

    // await db
    //   .insert({
    //     id: id,
    //     name: name,
    //   })
    //   .into("bands");

    //ou

    const newUser: {
      id: string;
      name: string;
    } = {
      id: id,
      name: name,
    };

    await db("bands").insert(newUser);

    res.status(200).send("Banda cadastrada com sucesso");
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

app.put("/bands/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 1) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }
    }

    // const [band] = await db.raw(`
    //         SELECT * FROM bands
    //         WHERE id = "${idToEdit}";
    //     `); // desestruturamos para encontrar o primeiro item do array

    const [band] = await db("bands").where({ id: idToEdit });

    if (band) {
      //   await db.raw(`
      //             UPDATE bands
      //             SET
      //                 id = "${newId || band.id}",
      //                 name = "${newName || band.name}"
      //             WHERE
      //                 id = "${idToEdit}";
      //         `);

      const editBand = {
        id: newId || band.id,
        name: newName || band.name,
      };

      await db("bands").update(editBand).where({ id: idToEdit });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
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

app.delete("/bands/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [band] = await db("bands").where({ id: idToDelete });

    if (!band) {
      res.status(400);
      throw new Error("Id não encontrado");
    }

    await db("bands").del().where({ id: idToDelete });

    res.send("Deletado com sucesso.");
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

app.get("/songs", async (req: Request, res: Response) => {
  try {
    const result = await db("songs");

    res.status(200).send(result);
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
    const id = req.body.id;
    const name = req.body.name;
    const bandId = req.body.bandId;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' inválido, deve ser string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' inválido, deve ser string");
    }

    if (typeof bandId !== "string") {
      res.status(400);
      throw new Error("'bandId' inválido, deve ser string");
    }

    if (id.length < 1 || name.length < 1 || bandId.length < 1) {
      res.status(400);
      throw new Error(
        "'id', 'name' e 'bandId' devem possuir no mínimo 1 caractere"
      );
    }

    const newSong = {
      id,
      name,
      band_id: bandId,
    };

    await db("songs").insert(newSong);

    res.status(200).send("Música cadastrada com sucesso");
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

app.put("/songs/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newBandId = req.body.bandId;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 1) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }
    }

    if (newBandId !== undefined) {
      if (typeof newBandId !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newBandId.length < 1) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }
    }

    const [song] = await db("songs").where({ id: idToEdit }); // desestruturamos para encontrar o primeiro item do array

    if (song) {
      const updateSong = {
        id: newId || song.id,
        name: newName || song.name,
        band_id: newBandId || song.band_id,
      };

      await db("songs").update(updateSong).where({ id: idToEdit });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
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

app.get("/songs/:id", async (req: Request, res: Response) => {
  try {
    const idSong = req.params.id;

    const result = await db
      .select(
        "songs.id",
        "songs.name AS nameSong",
        "band_id AS bandId",
        "bands.name AS nameBand"
      )
      .from("songs")
      .where({ "songs.id": idSong })
      .innerJoin("bands", "songs.band_id", "=", "bands.id");
    res.status(200).send(result);
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
