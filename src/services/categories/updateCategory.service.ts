import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface UpdateCategoryRequest {
  category_id: number;
  name: string;
}

class UpdateCategoryService {
  async execute({ category_id, name }: UpdateCategoryRequest) {
    const checkIfCategoryExists = await prismaClient.categories.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!checkIfCategoryExists) {
      throw new AppError("Course does not exist");
    }

    const category = await prismaClient.categories.update({
      where: {
        id: category_id,
      },
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { UpdateCategoryService };
