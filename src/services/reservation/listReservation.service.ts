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
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            coverImage: true,
            description: true,
            status: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return reservedBooks;
  }
}

export { ListReservationService };
