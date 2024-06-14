import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface BookRequest {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  isbn: string;
  shelf: string;
  bookcase: string;
  categoryId: number;
}

class CreateBookService {
  async execute({
    title,
    author,
    description,
    coverImage,
    isbn,
    shelf,
    bookcase,
    categoryId,
  }: BookRequest) {
    if (title === "") {
      throw new AppError("Title required");
    }

    const checkIfIsbnExists = await prismaClient.books.findFirst({
      where: {
        isbn,
      },
    });

    if (checkIfIsbnExists) {
      throw new AppError("Este livro já está cadastrado");
    }

    const newBook = await prismaClient.books.create({
      data: {
        title,
        author,
        description,
        coverImage: `/tmp/${coverImage}`,
        isbn,
        categoryId,
        shelf,
        bookcase,
      },
      select: {
        id: true,
        title: true,
        author: true,
        description: true,
        coverImage: true,
        isbn: true,
        shelf: true,
        bookcase: true,
        categoryId: true,
      },
    });

    return newBook;
  }
}

export { CreateBookService };
