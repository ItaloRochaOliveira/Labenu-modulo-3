export interface HeroesDB {
  id: string;
  name: string;
  power: string;
  created_at: string;
}

export interface UpdateHeroeInputDTO {
  name: string | undefined;
  power: string | undefined;
}
