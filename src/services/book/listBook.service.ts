import prismaClient from "../../prisma/prismaClient";

class ListBookService {
  async execute(_page: number, _limit: number) {
    const [books, total] = await prismaClient.$transaction([
      prismaClient.books.findMany({
        select: {
          id: true,
          title: true,
          author: true,
          categoryId: true,
          coverImage: true,
          description: true,
          isbn: true,
          shelf: true,
          bookcase: true,
        },
        skip: (_page - 1) * _limit,
        take: _limit,
      }),
      prismaClient.books.count(),
    ]);

    const totalPage = Math.ceil(total / _limit);

    return { total, totalPage, books };
  }
}

export { ListBookService };
