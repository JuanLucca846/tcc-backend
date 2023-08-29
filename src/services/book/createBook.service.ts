import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface BookRequest {
  title: string;
  author: string;
  quantity: number;
}

class CreateBookService {
  async execute({ title, author, quantity }: BookRequest) {
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

    const newBook = await prismaClient.book.create({
      data: {
        title: title,
        author: author,
        quantity: quantity,
      },
      select: {
        id: true,
        title: true,
        author: true,
        quantity: true,
      },
    });

    return newBook;
  }
}

export { CreateBookService };
