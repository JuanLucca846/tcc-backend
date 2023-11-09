import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface BookRequest {
  title: string;
  author: string;
  category: string;
  quantity: number;
}

class CreateBookService {
  async execute({ title, author, category, quantity }: BookRequest) {
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
