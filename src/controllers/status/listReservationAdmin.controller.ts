import { Request, Response } from "express";
import { ListReservationServiceAdmin } from "../../services/status/listReservationsAdmin.service";

class ListReservationControllerAdmin {
  async handle(req: Request, res: Response) {
    const listReservationService = new ListReservationServiceAdmin();

    const reservations = await listReservationService.execute();

    return res.json({ reservations });
  }
}

export { ListReservationControllerAdmin };
