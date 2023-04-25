import { Request, Response } from "express";
import { CousersBusiness } from "../business/CoursesBusiness";
import { BaseError } from "../errors/BaseError";

export class CoursesController {
  getCourses = async (req: Request, res: Response) => {
    try {
      const coursesBusiness = new CousersBusiness();
      const courses = await coursesBusiness.getCourses();

      res.status(200).send({ courses: courses });
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };
}
