import { knex } from "knex";

export abstract class BaseDatabase {
  protected static conection = knex({
    client: "sqlite3",
    connection: {
      filename: "./src/database/poo-3.db",
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });
}