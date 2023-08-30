import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface UpdateBookRequest {
  book_id: number;
  title: string;
  author: string;
  quantity: number;
}

class UpdateBookService {
  async execute({ book_id, title, author, quantity }: UpdateBookRequest) {
    const checkIfBookExists = await prismaClient.book.findFirst({
      where: {
        id: book_id,
      },
    });

    if (!checkIfBookExists) {
      throw new AppError("Book does not exist");
    }

    const book = await prismaClient.book.update({
      where: {
        id: book_id,
      },
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

    return book;
  }
}

export { UpdateBookService };
