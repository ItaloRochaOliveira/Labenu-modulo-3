import { CoursesDatabase } from "../database/CoursesDatabase";
import { BadRequestError } from "../errors/BadRequestError";

export class CousersBusiness {
  getCourses = async () => {
    const coursesDatabase = new CoursesDatabase();
    const courses = await coursesDatabase.findCourses();

    if (!courses.length) {
      throw new BadRequestError("Não foi possivel encontrar users");
    }

    return courses;
  };

  createCourses = async (input: any) => {
    const coursesDatabase = new CoursesDatabase();
    const created = await coursesDatabase.createCourses(input);

    return created;
  };
}
