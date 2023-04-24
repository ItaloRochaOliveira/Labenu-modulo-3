import { Request, Response } from "express";
import { SuperHeroesDatabase } from "../database/SuperHeroesDatabase";
import { SuperHeroes } from "../models/superHeroes";
import { HeroesDB, UpdateHeroeInputDTO } from "../interface";
import { HeroesBusiness } from "../business/HeroesBusiness";

export class HeroesController {
  public findAllHeroes = async (req: Request, res: Response) => {
    try {
      const heroesBusiness = new HeroesBusiness();
      const heroes = await heroesBusiness.getHeroes();

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

  createHero = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id as string,
        name: req.body.name as string,
        power: req.body.power as string,
      };

      const heroesBusiness = new HeroesBusiness();
      const output = await heroesBusiness.creteHeroe(input);

      res.status(200).send(output);
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

  updateHero = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { name, power } = req.body as UpdateHeroeInputDTO;

      const input = { id, name, power };

      const heroesBusiness = new HeroesBusiness();
      const output = await heroesBusiness.updateHeroe(input);

      res.status(200).send(output);
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

  deleteHero = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const heroesBusiness = new HeroesBusiness();
      const output = await heroesBusiness.deleteHeroe(id);

      res.status(200).send(output);
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
