import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { UserDB } from "../types";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const q = req.query as {
        q: string | undefined;
      };

      const userBusiness = new UserBusiness();
      const output = await userBusiness.getUser(q);

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

  public createUser = async (req: Request, res: Response) => {
    try {
      const input = req.body;

      const userBusiness = new UserBusiness();
      const output = userBusiness.createUsers(input);

      res.status(201).send(output);
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
