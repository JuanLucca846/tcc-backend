import { Request, Response } from "express";
import { ListReservationService } from "../../services/reservation/listReservation.service";

class ListReservationController {
  async handle(req: Request, res: Response) {
    const listReservationService = new ListReservationService();

    const userId = Number(req.user_id);

    const reservedBooks = await listReservationService.execute({ userId });

    return res.json({ books: reservedBooks });
  }
}

export { ListReservationController };
