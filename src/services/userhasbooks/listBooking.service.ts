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
    });

    return rentedBooks;
  }
}

export { ListBookingService };
