import prismaClient from "../../prisma/prismaClient";

export interface rentRequest {
  userId: number;
}

class ListBookingService {
  async execute({ userId }: rentRequest) {
    const rentedBooks = await prismaClient.booking.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        bookId: true,
        created_at: true,
        updated_at: true,
        book: {
          select: {
            title: true,
            author: true,
          },
        },
      },
    });

    const formattedRentedBooks = rentedBooks.map((booking) => {
      return {
        id: booking.id,
        userId: booking.userId,
        bookId: booking.bookId,
        book: booking.book,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      };
    });

    return formattedRentedBooks;
  }
}

export { ListBookingService };
