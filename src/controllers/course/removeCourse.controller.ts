import { Request, Response } from "express";
import { RemoveCourseService } from "../../services/course/removeCourse.service";

class RemoveCourseController {
  async handle(req: Request, res: Response) {
    const course_id = Number(req.params.id);

    const removeCourseService = new RemoveCourseService();

    const course = await removeCourseService.execute({
      course_id,
    });

    return res.json(course);
  }
}

export { RemoveCourseController };
