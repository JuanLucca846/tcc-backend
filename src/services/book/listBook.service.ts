import prismaClient from "../../prisma/prismaClient";

interface SearchParams {
  page: number;
  limit: number;
  isbn?: string;
  title?: string;
  author?: string;
  category?: string;
}

class ListBookService {
  async execute({ page, limit, isbn, title, author, category }: SearchParams) {
    const where: any = {};

    if (isbn) {
      where.isbn = { contains: isbn };
    }
    if (title) {
      where.title = { contains: title, mode: "insensitive" };
    }
    if (author) {
      where.author = { contains: author, mode: "insensitive" };
    }
    if (category) {
      where.category = { name: { contains: category, mode: "insensitive" } };
    }

    const [books, total] = await prismaClient.$transaction([
      prismaClient.books.findMany({
        where,
        select: {
          id: true,
          title: true,
          author: true,
          coverImage: true,
          description: true,
          isbn: true,
          shelf: true,
          bookcase: true,
          status: true,
          category: {
            select: {
              name: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prismaClient.books.count({ where }),
    ]);

    const totalPage = Math.ceil(total / limit);

    return { total, totalPage, books };
  }
}

export { ListBookService };
