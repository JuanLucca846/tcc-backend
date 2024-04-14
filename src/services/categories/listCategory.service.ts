import prismaClient from "../../prisma/prismaClient";

class ListCategoryService {
  async execute() {
    const listCategories = prismaClient.categories.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return listCategories;
  }
}

export { ListCategoryService };
