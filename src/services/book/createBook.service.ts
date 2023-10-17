import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface BookRequest {
  title: string;
  author: string;
  category: string;
  cover: string;
  quantity: number;
}

class CreateBookService {
  async execute({ title, author, category, cover, quantity }: BookRequest) {
    if (title === "") {
      throw new AppError("Title required");
    }

    const checkIfTitleExist = await prismaClient.book.findFirst({
      where: {
        title,
      },
    });

    if (checkIfTitleExist) {
      throw new AppError("This book is already registered");
    }

    const quantityAsNumber = parseInt(quantity.toString(), 10);

    const newBook = await prismaClient.book.create({
      data: {
        title: title,
        author: author,
        category: category,
        cover: cover,
        quantity: quantityAsNumber,
      },
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        quantity: true,
      },
    });

    return newBook;
  }
}

export { CreateBookService };
