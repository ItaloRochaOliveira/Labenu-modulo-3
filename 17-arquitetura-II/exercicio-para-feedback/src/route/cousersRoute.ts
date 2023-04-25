import express from "express";
import { CoursesController } from "../controller/CoursesController";

export const cousersRoute = express.Router();

const coursesController = new CoursesController();

cousersRoute.get("/", coursesController.getCourses);
