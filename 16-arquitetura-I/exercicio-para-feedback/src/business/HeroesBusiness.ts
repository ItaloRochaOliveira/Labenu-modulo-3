import { SuperHeroesDatabase } from "../database/SuperHeroesDatabase";
import { HeroesDB } from "../interface";
import { SuperHeroes } from "../models/superHeroes";

export class HeroesBusiness {
  public getHeroes = async () => {
    const heroe = new SuperHeroesDatabase();
    const heroesDB = await heroe.findHeroes();

    if (!heroesDB.length) {
      //   res.status(400);
      throw new Error("ainda não há itens na tabela. ");
    }

    const heroes = heroesDB.map(
      (heroeDB) =>
        new SuperHeroes(
          heroeDB.id,
          heroeDB.name,
          heroeDB.power,
          heroeDB.created_at,
          heroeDB.category
        )
    );

    return heroes;
  };

  creteHeroe = async (input: any) => {
    const { id, name, power, category } = input;

    if (id !== undefined) {
      if (typeof id !== "string") {
        // res.status(400);
        throw new Error("id tem que ser de tipo string ");
      }
      if (id.length <= 0) {
        // res.status(400);
        throw new Error("id tem que ter no mínimo 1 caracter");
      }
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        // res.status(400);
        throw new Error("name tem que ser de tipo string ");
      }
      if (name.length <= 0) {
        // res.status(400);
        throw new Error("name tem que ter no mínimo 1 caracter");
      }
    }

    if (power !== undefined) {
      if (typeof power !== "string") {
        // res.status(400);
        throw new Error("power tem que ser de tipo string ");
      }
      if (power.length <= 0) {
        // res.status(400);
        throw new Error("power tem que ter no mínimo 1 caracter");
      }
    }

    if (category !== undefined) {
      if (typeof category !== "string") {
        // res.status(400);
        throw new Error("category tem que ser de tipo string ");
      }
      if (category.length <= 0) {
        // res.status(400);
        throw new Error("category tem que ter no mínimo 1 caracter");
      }
    }

    const heroe = new SuperHeroesDatabase();
    const heroeExist = await heroe.findHeroeById(id);

    if (heroeExist) {
      //   res.status(400);
      throw new Error("Herói já existe, tente outro");
    }

    const newHeroe = new SuperHeroes(
      id,
      name,
      power,
      new Date().toISOString(),
      category
    );

    const heroeDB = {
      id: newHeroe._id,
      name: newHeroe._name,
      power: newHeroe._power,
      created_at: newHeroe._createdAt,
      category: category._category,
    };

    await heroe.createHeroe(heroeDB);

    const output = {
      message: "Herói enviado com sucesso!",
      newHeroe,
    };

    return output;
  };

  updateHeroe = async (input: any) => {
    const { id, name, power } = input;
    if (name !== undefined) {
      if (typeof name !== "string") {
        // res.send(400);
        throw new Error("name tem que ser de tipo string ");
      }
      if (name.length <= 0) {
        // res.send(400);
        throw new Error("name tem que ter no mínimo 1 caracter");
      }
    }

    if (power !== undefined) {
      if (typeof power !== "string") {
        // res.send(400);
        throw new Error("power tem que ser de tipo string ");
      }
      if (power.length <= 0) {
        // res.send(400);
        throw new Error("power tem que ter no mínimo 1 caracter");
      }
    }

    const heroeDB = new SuperHeroesDatabase();
    const heroeExist = await heroeDB.findHeroeById(id);

    if (!heroeExist) {
      // res.status(400);
      throw new Error("não existe heroe com esse id, tente outro");
    }

    const updateVideo = new SuperHeroes(
      heroeExist.id,
      heroeExist.name,
      heroeExist.power,
      heroeExist.created_at,
      heroeExist.category
    );

    name && (updateVideo._name = name);
    power && (updateVideo._power = power);

    const updateHeroeDB: HeroesDB = {
      id: updateVideo._id,
      name: updateVideo._name,
      power: updateVideo._power,
      created_at: updateVideo._createdAt,
      category: updateVideo._category,
    };

    await heroeDB.updateHeroe(updateHeroeDB, id);

    return {
      message: "Atualizado com sucesso",
      updateHeroeDB,
    };
  };

  deleteHeroe = async (id: any) => {
    const heroeDB = new SuperHeroesDatabase();
    const heroeExist = await heroeDB.findHeroeById(id);

    if (!heroeExist) {
      // res.status(400);
      throw new Error("Herói não encontrado para exclusão.");
    }

    await heroeDB.deleteHeroe(id);

    return {
      message: "Video excluido com sucesso!",
    };
  };
}
