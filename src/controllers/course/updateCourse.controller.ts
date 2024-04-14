import { Request, Response } from "express";
import { UpdateCourseService } from "../../services/course/updateCourse.service";

class UpdateCourseController {
  async handle(req: Request, res: Response) {
    const course_id = Number(req.params.id);

    const { name } = req.body;

    const updateCourseService = new UpdateCourseService();

    const course = await updateCourseService.execute({
      course_id,
      name,
    });

    return res.json(course);
  }
}

export { UpdateCourseController };
