import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

export interface BookingRequest {
  userId: number;
  bookId: number;
}

class CreateBookingService {
  async execute({ userId, bookId }: BookingRequest) {
    const countUserBookings = await prismaClient.booking.count({
      where: {
        userId,
      },
    });

    if (countUserBookings >= 2) {
      throw new AppError("User already booked the maximum of 2 books");
    }

    const alreadyBooked = await prismaClient.booking.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (alreadyBooked) {
      throw new AppError("The user already booked this book");
    }

    const checkAvailableBooks = await prismaClient.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!checkAvailableBooks || checkAvailableBooks.quantity <= 0) {
      throw new AppError("This book is not available for booking");
    }

    const newBooking = await prismaClient.booking.create({
      data: {
        userId,
        bookId,
      },
    });

    await prismaClient.book.update({
      where: {
        id: bookId,
      },
      data: {
        quantity: checkAvailableBooks.quantity - 1,
      },
    });

    return newBooking;
  }
}

export { CreateBookingService };
