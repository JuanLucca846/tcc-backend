import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

export interface ReturnBookingRequest {
  userId: number;
  bookId: number;
}

class ReturnBookingService {
  async execute({ userId, bookId }: ReturnBookingRequest) {
    const booking = await prismaClient.booking.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (!booking) {
      throw new AppError("This booking does not exist");
    }

    await prismaClient.booking.delete({
      where: {
        id: booking.id,
      },
    });

    const book = await prismaClient.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new AppError("Book not found");
    }

    await prismaClient.book.update({
      where: {
        id: bookId,
      },
      data: {
        quantity: book.quantity + 1,
      },
    });
  }
}

export { ReturnBookingService };
