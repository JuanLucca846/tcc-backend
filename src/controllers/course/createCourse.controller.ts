import { Request, Response } from "express";

import { AppError } from "../../errors/AppError";
import { CreateCourseService } from "../../services/course/createCourse.service";

class CreateCourseController {
  async handle(req: Request, res: Response) {
    const createCourseService = new CreateCourseService();

    const { name } = req.body;

    const course = await createCourseService.execute({
      name,
    });

    res.status(201).json(course);
  }
}

export { CreateCourseController };
