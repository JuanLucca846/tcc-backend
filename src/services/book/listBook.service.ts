import prismaClient from "../../prisma/prismaClient";

class ListBookService {
  async execute(_page: number, _limit: number) {
    const [books, total] = await prismaClient.$transaction([
      prismaClient.book.findMany({
        select: {
          id: true,
          title: true,
          author: true,
          category: true,
          quantity: true,
        },
        skip: (_page - 1) * _limit,
        take: _limit,
      }),
      prismaClient.book.count(),
    ]);

    const totalPage = Math.ceil(total / _limit);

    return { total, totalPage, books };
  }
}

export { ListBookService };
