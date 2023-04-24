import { Request, Response } from "express";
import { AccountDatabase } from "../database/AccountDatabase";
import { Account } from "../models/Account";
import { AccountDB } from "../types";
import { AccountBusiness } from "../business/AccountBusiness";

export class AccountController {
  public getAccounts = async (req: Request, res: Response) => {
    try {
      const accountBusiness = new AccountBusiness();
      const accounts = await accountBusiness.getAccounts();

      res.status(200).send(accounts);
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

  public getAccountBalance = async (req: Request, res: Response) => {
    try {
      const id = req.params;

      const accountBusiness = new AccountBusiness();
      const balance = await accountBusiness.getAccountBalance(id);

      res.status(200).send({ balance });
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

  public createAccount = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      const accountBusiness = new AccountBusiness();
      const output = await accountBusiness.creatAccount(body);

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

  public editAccountBalance = async (req: Request, res: Response) => {
    try {
      const input = req.body;

      const accountBusiness = new AccountBusiness();
      const output = await accountBusiness.editAccount(input);

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
