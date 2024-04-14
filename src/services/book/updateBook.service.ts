import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface UpdateBookRequest {
  book_id: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  shelf: string;
  bookcase: string;
  categoryId: number;
}

class UpdateBookService {
  async execute({
    book_id,
    title,
    author,
    description,
    isbn,
    shelf,
    bookcase,
    categoryId,
  }: UpdateBookRequest) {
    const checkIfBookExists = await prismaClient.books.findFirst({
      where: {
        id: book_id,
      },
    });

    if (!checkIfBookExists) {
      throw new AppError("Book does not exist");
    }

    const book = await prismaClient.books.update({
      where: {
        id: book_id,
      },
      data: {
        title: title,
        author: author,
        description: description,
        isbn: isbn,
        shelf: shelf,
        bookcase: bookcase,
        categoryId: categoryId,
      },
      select: {
        id: true,
        title: true,
        author: true,
        description: true,
        isbn: true,
        shelf: true,
        bookcase: true,
        categoryId: true,
      },
    });

    return book;
  }
}

export { UpdateBookService };
