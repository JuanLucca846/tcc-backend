import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface RemoveCourseRequest {
  course_id: number;
}

class RemoveCourseService {
  async execute({ course_id }: RemoveCourseRequest) {
    const checkIfCourseExists = await prismaClient.courses.findFirst({
      where: {
        id: course_id,
      },
    });

    if (!checkIfCourseExists) {
      throw new AppError("Course does not exist");
    }

    const course = await prismaClient.courses.delete({
      where: {
        id: course_id,
      },
      select: {
        name: true,
      },
    });

    return course;
  }
}

export { RemoveCourseService };
