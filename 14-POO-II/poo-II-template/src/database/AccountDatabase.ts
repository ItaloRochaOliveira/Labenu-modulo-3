import { TAccountDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class AccountDatabase extends BaseDatabase {
  public static TABLE_ACCOUNT = "accounts";

  public async findUser(): Promise<TAccountDB[]> {
    const accountsDB: TAccountDB[] = await BaseDatabase.connection(
      AccountDatabase.TABLE_ACCOUNT
    );
    return accountsDB;
  }

  public async findUserById(id: string): Promise<TAccountDB | undefined> {
    const [accountDB]: TAccountDB[] | undefined[] =
      await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNT).where({
        id,
      });

    return accountDB;
  }

  public async createUser(newAccount: TAccountDB): Promise<void> {
    await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNT).insert(
      newAccount
    );
  }

  public async updateBalance(newBalance: number, id: string): Promise<void> {
    await BaseDatabase.connection(AccountDatabase.TABLE_ACCOUNT)
      .update({ balance: newBalance })
      .where({ id });
  }
}
