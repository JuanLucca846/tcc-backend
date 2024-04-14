import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface CourseRequest {
  name: string;
}

class CreateCourseService {
  async execute({ name }: CourseRequest) {
    if (!name) {
      throw new AppError("Name required");
    }

    const checkIfCourseExists = await prismaClient.courses.findFirst({
      where: {
        name,
      },
    });

    if (checkIfCourseExists) {
      throw new AppError("Este curso já está cadastrado");
    }

    const newCourse = await prismaClient.courses.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return newCourse;
  }
}

export { CreateCourseService };
