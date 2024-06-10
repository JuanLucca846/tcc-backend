import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

export interface ReservationRequest {
  userId: number;
  bookId: number;
  status: string;
}

class CreateReservationService {
  async execute({ userId, bookId, status }: ReservationRequest) {
    const countUserReservations = await prismaClient.reservations.count({
      where: {
        userId,
      },
    });

    if (countUserReservations >= 2) {
      throw new AppError("User already booked the maximum of 2 books");
    }

    const alreadyReserved = await prismaClient.reservations.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (alreadyReserved) {
      throw new AppError("The user already reserved this book");
    }

    const newReservation = await prismaClient.reservations.create({
      data: {
        userId,
        bookId,
        status: 'reserved',
      },
    });

    await prismaClient.books.update({
      where: {id: bookId},
      data: {status: "Reservado"},
    });

    return newReservation;
  }
}

export { CreateReservationService };
