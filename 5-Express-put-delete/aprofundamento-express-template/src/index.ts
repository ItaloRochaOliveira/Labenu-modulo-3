import express, { Request, Response } from "express";
import cors from "cors";
import { accounts } from "./database";
import { ACCOUNT_TYPE } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/accounts", (req: Request, res: Response) => {
  res.send(accounts);
});

app.get("/accounts/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const userFiltered = accounts.find((account) => account.id === id);

  userFiltered
    ? res.status(200).send({
        mensage: "User encontrado: ",
        userFiltered,
      })
    : res.status(404).send("User não encontrado");
});

app.delete("/accounts/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const userFilteredIndex = accounts.findIndex((account) => account.id === id);

  if (userFilteredIndex === -1) {
    return res.status(404).send("Usuário não encontrado");
  }
  accounts.splice(userFilteredIndex, 1);

  res.status(200).send("Usuário excluido com sucesso!");
});

app.put("/accounts/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newId = req.body.id as string | undefined;
  const newOwnerName = req.body.ownerName as string;
  const newBalance = req.body.balance as number | undefined;
  const newType = req.body.type as ACCOUNT_TYPE | undefined;

  const accountToEdit = accounts.find((account) => account.id === id);

  if (!accountToEdit) {
    return res.status(404).send("Usuário não encontrado");
  }

  accountToEdit.id = newId || accountToEdit.id;
  accountToEdit.ownerName = newOwnerName || accountToEdit.ownerName;
  accountToEdit.balance = isNaN(newBalance)
    ? accountToEdit.balance
    : newBalance;
  accountToEdit.type = newType || accountToEdit.type;

  res.status(200).send({
    mensage: "user atualizado com sucesso!",
  });
});
