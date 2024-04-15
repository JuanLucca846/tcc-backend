import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

export interface CancelReservationRequest {
  userId: number;
  bookId: number;
}

class CancelReservationService {
  async execute({ userId, bookId }: CancelReservationRequest) {
    const reservation = await prismaClient.reservations.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (!reservation) {
      throw new AppError("This reservation does not exist");
    }

    await prismaClient.reservations.delete({
      where: {
        id: reservation.id,
      },
    });
  }
}

export { CancelReservationService };
