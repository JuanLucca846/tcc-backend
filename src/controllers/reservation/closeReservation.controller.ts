import { Request, Response } from "express";
import { CloseReservationService } from "../../services/reservation/closeReservation.service";

class CloseReservationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const closeReservationService = new CloseReservationService();

    const loan = await closeReservationService.execute({
      reservationId: parseInt(id),
    });
    res.json({ msg: "Reservation closed", loan });
  }
}

export { CloseReservationController };
