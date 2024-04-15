import prismaClient from "../../prisma/prismaClient";

export interface rentRequest {
  userId: number;
}

class ListReservationService {
  async execute({ userId }: rentRequest) {
    const reservedBooks = await prismaClient.reservations.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        bookId: true,
        status: true,
        book: {
          select: {
            title: true,
            author: true,
          },
        },
      },
    });

    return reservedBooks;
  }
}

export { ListReservationService };
