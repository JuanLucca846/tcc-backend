import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface BookRequest {
  title: string;
  author: string;
  category: string;
  quantity: number;
  description: string;
  coverImage: string;
}

class CreateBookService {
  async execute({
    title,
    author,
    category,
    quantity,
    description,
    coverImage,
  }: BookRequest) {
    if (title === "") {
      throw new AppError("Title required");
    }

    const checkIfTitleExist = await prismaClient.book.findFirst({
      where: {
        title,
      },
    });

    if (checkIfTitleExist) {
      throw new AppError("Este livro já está cadastrado");
    }

    const quantityAsNumber = parseInt(quantity.toString(), 10);

    const newBook = await prismaClient.book.create({
      data: {
        title,
        author,
        category,
        quantity: quantityAsNumber,
        description,
        coverImage: `/tmp/${coverImage}`,
      },
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        quantity: true,
        description: true,
        coverImage: true,
      },
    });

    return newBook;
  }
}

export { CreateBookService };
