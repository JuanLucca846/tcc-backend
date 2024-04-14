import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (!name) {
      throw new AppError("Name required");
    }

    const checkIfCategoryExists = await prismaClient.categories.findFirst({
      where: {
        name,
      },
    });

    if (checkIfCategoryExists) {
      throw new AppError("Essa categoria já está cadastrado");
    }

    const newCategory = await prismaClient.categories.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return newCategory;
  }
}

export { CreateCategoryService };
