import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface CloseReservationRequest {
  reservationId: number;
}

class CloseReservationService {
  async execute({ reservationId }: CloseReservationRequest) {
    const reservation = await prismaClient.reservations.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const newLoan = await prismaClient.loans.create({
      data: {
        userId: reservation.userId,
        bookId: reservation.bookId,
        borrowedAt: new Date(),
        dueDate: dueDate,
      },
    });

    await prismaClient.reservations.delete({ where: { id: reservationId } });

    return newLoan;
  }
}

export { CloseReservationService };
