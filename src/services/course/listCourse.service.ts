import prismaClient from "../../prisma/prismaClient";

class ListCourseService {
  async execute() {
    const listCourses = prismaClient.courses.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return listCourses;
  }
}

export { ListCourseService };
