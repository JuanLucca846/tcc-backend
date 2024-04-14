import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface RemoveCategoryRequest {
  category_id: number;
}

class RemoveCategoryService {
  async execute({ category_id }: RemoveCategoryRequest) {
    const checkIfCategoryExists = await prismaClient.categories.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!checkIfCategoryExists) {
      throw new AppError("Course does not exist");
    }

    const category = await prismaClient.categories.delete({
      where: {
        id: category_id,
      },
      select: {
        name: true,
      },
    });

    return category;
  }
}

export { RemoveCategoryService };
