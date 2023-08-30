import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface RemoveBookRequest {
  book_id: number;
}

class RemoveBookService {
  async execute({ book_id }: RemoveBookRequest) {
    const checkIfBookExists = await prismaClient.book.findFirst({
      where: {
        id: book_id,
      },
    });

    if (!checkIfBookExists) {
      throw new AppError("Book does not exist");
    }

    const book = await prismaClient.book.delete({
      where: {
        id: book_id,
      },
    });

    return book;
  }
}

export { RemoveBookService };
