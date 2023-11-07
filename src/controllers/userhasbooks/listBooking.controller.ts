import { Request, Response } from "express";
import { ListBookingService } from "../../services/userhasbooks/listBooking.service";

class ListBookingController {
  async handle(req: Request, res: Response) {
    const listBookingService = new ListBookingService();

    const userId = Number(req.params.id);

    const rentedBooks = await listBookingService.execute({ userId });

    return res.json(rentedBooks);
  }
}

export { ListBookingController };
