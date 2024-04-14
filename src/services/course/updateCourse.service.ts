import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface UpdateCourseRequest {
  course_id: number;
  name: string;
}

class UpdateCourseService {
  async execute({ course_id, name }: UpdateCourseRequest) {
    const checkIfCourseExists = await prismaClient.courses.findFirst({
      where: {
        id: course_id,
      },
    });

    if (!checkIfCourseExists) {
      throw new AppError("Course does not exist");
    }

    const course = await prismaClient.courses.update({
      where: {
        id: course_id,
      },
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return course;
  }
}

export { UpdateCourseService };
