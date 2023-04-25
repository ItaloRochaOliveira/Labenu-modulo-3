import { BaseDatabase } from "./BaseDatabase";

export class CoursesDatabase extends BaseDatabase {
  findCourses = async () => {
    const coursesDB = await BaseDatabase.conection("courses");
    return coursesDB;
  };

  createCourses = async (input: any) => {
    await BaseDatabase.conection("courses").insert(input);

    return {
      message: "criado com sucesso!",
      input,
    };
  };
}
