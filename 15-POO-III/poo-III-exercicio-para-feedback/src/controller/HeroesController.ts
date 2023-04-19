import { Request, Response } from "express";
import { SuperHeroesDatabase } from "../database/SuperHeroesDatabase";
import { SuperHeroes } from "../models/superHeroes";
import { HeroesDB, UpdateHeroeInputDTO } from "../interface";

export class HeroesController {
  findAllHeroes = async (req: Request, res: Response) => {
    try {
      const heroe = new SuperHeroesDatabase();
      const heroesDB = await heroe.findHeroes();

      if (!heroesDB.length) {
        res.status(400);
        throw new Error("ainda não há itens na tabela. ");
      }

      const heroes = heroesDB.map(
        (heroeDB) =>
          new SuperHeroes(
            heroeDB.id,
            heroeDB.name,
            heroeDB.power,
            heroeDB.created_at
          )
      );

      res.status(200).send(heroes);
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
  };

  createHeroe = async (req: Request, res: Response) => {
    try {
      const { id, name, power } = req.body as {
        id: string;
        name: string;
        power: string;
      };

      if (id !== undefined) {
        if (typeof id !== "string") {
          res.status(400);
          throw new Error("id tem que ser de tipo string ");
        }
        if (id.length <= 0) {
          res.status(400);
          throw new Error("id tem que ter no mínimo 1 caracter");
        }
      }

      if (name !== undefined) {
        if (typeof name !== "string") {
          res.status(400);
          throw new Error("name tem que ser de tipo string ");
        }
        if (name.length <= 0) {
          res.status(400);
          throw new Error("name tem que ter no mínimo 1 caracter");
        }
      }

      if (power !== undefined) {
        if (typeof power !== "string") {
          res.status(400);
          throw new Error("power tem que ser de tipo string ");
        }
        if (power.length <= 0) {
          res.status(400);
          throw new Error("power tem que ter no mínimo 1 caracter");
        }
      }

      const heroe = new SuperHeroesDatabase();
      const heroeExist = await heroe.findHeroeById(id);

      if (heroeExist) {
        res.status(400);
        throw new Error("Herói já existe, tente outro");
      }

      const newHeroe = new SuperHeroes(
        id,
        name,
        power,
        new Date().toISOString()
      );

      const heroeDB = {
        id: newHeroe._id,
        name: newHeroe._name,
        power: newHeroe._power,
        created_at: newHeroe._createdAt,
      };

      await heroe.createHeroe(heroeDB);

      res.status(200).send({ message: "Herói enviado com sucesso!", heroeDB });
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
  };

  updateHeroe = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { name, power } = req.body as UpdateHeroeInputDTO;

      if (name !== undefined) {
        if (typeof name !== "string") {
          res.send(400);
          throw new Error("name tem que ser de tipo string ");
        }
        if (name.length <= 0) {
          res.send(400);
          throw new Error("name tem que ter no mínimo 1 caracter");
        }
      }

      if (power !== undefined) {
        if (typeof power !== "string") {
          res.send(400);
          throw new Error("power tem que ser de tipo string ");
        }
        if (power.length <= 0) {
          res.send(400);
          throw new Error("power tem que ter no mínimo 1 caracter");
        }
      }

      const heroeDB = new SuperHeroesDatabase();
      const heroeExist = await heroeDB.findHeroeById(id);

      if (!heroeExist) {
        res.status(400);
        throw new Error("não existe heroe com esse id, tente outro");
      }

      const updateVideo = new SuperHeroes(
        heroeExist.id,
        heroeExist.name,
        heroeExist.power,
        heroeExist.created_at
      );

      name && (updateVideo._name = name);
      power && (updateVideo._power = power);

      const updateHeroeDB: HeroesDB = {
        id: updateVideo._id,
        name: updateVideo._name,
        power: updateVideo._power,
        created_at: updateVideo._createdAt,
      };

      await heroeDB.updateHeroe(updateHeroeDB, id);

      res
        .status(200)
        .send({ message: "Atualizado com sucesso", updateHeroeDB });
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
  };

  deleteHeroe = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const heroeDB = new SuperHeroesDatabase();
      const heroeExist = await heroeDB.findHeroeById(id);

      if (!heroeExist) {
        res.status(400);
        throw new Error("Herói não encontrado para exclusão.");
      }

      await heroeDB.deleteHeroe(id);

      res.status(200).send({ message: "Video excluido com sucesso!" });
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
  };
}
