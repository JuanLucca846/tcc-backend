import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { CreateReservationService } from "../../services/reservation/createReservation.service";

class CreateReservationController {
  async handle(req: Request, res: Response) {
    const createReservationService = new CreateReservationService();

    const { userId, bookId, status } = req.body;

    const reservation = await createReservationService.execute({
      userId,
      bookId,
      status,
    });

    return res.json(reservation);
  }
}

export { CreateReservationController };
