import prismaClient from "../../prisma/prismaClient";

class ListBookService {
  async execute() {
    const book = await prismaClient.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        quantity: true,
      },
    });

    return book;
  }
}

export { ListBookService };
