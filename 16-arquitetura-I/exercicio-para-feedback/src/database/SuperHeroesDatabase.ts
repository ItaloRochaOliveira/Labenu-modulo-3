import { BaseDatabase } from "./BaseDatabase";
import { HeroesDB } from "../interface";

export class SuperHeroesDatabase extends BaseDatabase {
  public static TABLE_HEROES = "super_heroes";

  public async findHeroes(): Promise<HeroesDB[]> {
    const heroesDB: HeroesDB[] = await BaseDatabase.conection
      .select("super_heroes.*", "category.name as category")
      .from(SuperHeroesDatabase.TABLE_HEROES)
      .innerJoin(
        "heroes_category",
        "heroes_category.id_heroe",
        "=",
        "super_heroes.id"
      )
      .innerJoin("category", "category.id", "=", "heroes_category.id_category");
    return heroesDB;
  }

  public async findHeroeById(id: string): Promise<HeroesDB> {
    const [heroeDB]: HeroesDB[] = await BaseDatabase.conection(
      SuperHeroesDatabase.TABLE_HEROES
    ).where({ id });
    return heroeDB;
  }

  public async createHeroe(newHeroe: HeroesDB): Promise<void> {
    await BaseDatabase.conection(SuperHeroesDatabase.TABLE_HEROES).insert(
      newHeroe
    );
  }

  public async updateHeroe(updateHeroe: HeroesDB, id: string): Promise<void> {
    await BaseDatabase.conection(SuperHeroesDatabase.TABLE_HEROES)
      .update(updateHeroe)
      .where({ id });
  }

  public async deleteHeroe(id: string): Promise<void> {
    await BaseDatabase.conection(SuperHeroesDatabase.TABLE_HEROES)
      .del()
      .where({ id });
  }
}
