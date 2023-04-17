import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { Video } from "./models/Videos";

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

app.get("/videos", async (req: Request, res: Response) => {
  try {
    const videosDB = await db("videos");

    if (!videosDB.length) {
      res.send(400);
      throw new Error("ainda não há itens na tabela. ");
    }

    const videos = videosDB.map(
      (videoDB) =>
        new Video(
          videoDB.id,
          videoDB.title,
          videoDB.duration,
          videoDB.created_at
        )
    );

    res.status(200).send(videos);
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

app.post("/videos", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const title = req.body.title as string;
    const duration = req.body.duration as number;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.send(400);
        throw new Error("id tem que ser de tipo string ");
      }
      if (id.length <= 0) {
        res.send(400);
        throw new Error("id tem que ter no mínimo 1 caracter");
      }
    }

    if (title !== undefined) {
      if (typeof title !== "string") {
        res.send(400);
        throw new Error("title tem que ser de tipo string ");
      }
      if (title.length <= 0) {
        res.send(400);
        throw new Error("title tem que ter no mínimo 1 caracter");
      }
    }

    if (duration !== undefined) {
      if (typeof duration !== "number") {
        res.send(400);
        throw new Error("duration tem que ser de tipo number ");
      }
      if (duration <= 0) {
        res.send(400);
        throw new Error("duration tem que ter no mínimo 1 caracter");
      }
    }

    const [videoExist] = await db("videos").where("id", id);

    if (videoExist) {
      res.send(400);
      throw new Error("Video já existe, tente outro");
    }

    const newVideo = new Video(id, title, duration, new Date().toISOString());

    const videoDB = {
      id: newVideo.get("id"),
      title: newVideo.get("title"),
      duration: newVideo.get("duration"),
      created_at: newVideo.get("created_at"),
    };

    await db("videos").insert(videoDB);

    res.status(200).send({ message: "Video enviado com sucesso!", videoDB });
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

app.put("/videos/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const title = req.body.title as string;
    const duration = req.body.duration as number;

    if (title !== undefined) {
      if (typeof title !== "string") {
        res.send(400);
        throw new Error("title tem que ser de tipo string ");
      }
      if (title.length <= 0) {
        res.send(400);
        throw new Error("title tem que ter no mínimo 1 caracter");
      }
    }

    if (duration !== undefined) {
      if (typeof duration !== "number") {
        res.send(400);
        throw new Error("duration tem que ser de tipo number ");
      }
      if (duration <= 0) {
        res.send(400);
        throw new Error("duration tem que ter no mínimo 1 caracter");
      }
    }

    const [videoExist] = await db("videos").where("id", id);

    if (!videoExist) {
      res.send(400);
      throw new Error("não existe video com esse id, tente outro");
    }

    const video = new Video(id, title, duration, new Date().toISOString());

    const updateVideDB = {
      id: video.get("id") || videoExist.id,
      title: video.get("title") || videoExist.title,
      duration: video.get("duration") || videoExist.duration,
      created_at: video.get("created_at"),
    };

    await db("videos").update(updateVideDB).where({ id });

    res.status(200).send({ message: "Atualizado com sucesso", updateVideDB });
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
