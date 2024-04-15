import { Request, Response } from "express";
import { CancelReservationService } from "../../services/reservation/cancelReservation.service";

class CancelReservationController {
  async handle(req: Request, res: Response) {
    const cancelReservationService = new CancelReservationService();

    const { userId, bookId } = req.body;

    const cancelReservation = await cancelReservationService.execute({
      userId,
      bookId,
    });

    return res.json("Reservation cancelled");
  }
}

export { CancelReservationController };
