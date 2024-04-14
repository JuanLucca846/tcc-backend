import { Request, Response } from "express";
import { ListCourseService } from "../../services/course/listCourse.service";

class ListCourseController {
  async handle(req: Request, res: Response) {
    const listCourseService = new ListCourseService();

    const courses = await listCourseService.execute();

    return res.json(courses);
  }
}

export { ListCourseController };
