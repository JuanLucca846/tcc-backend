import { Request, Response } from "express";
import { ReturnBookingService } from "../../services/userhasbooks/returnBooking.service";

class ReturnBookingController {
  async handle(req: Request, res: Response) {
    const returnBookingService = new ReturnBookingService();

    const { userId, bookId } = req.body;

    const returnBooking = await returnBookingService.execute({
      userId,
      bookId,
    });

    return res.json("Book returned");
  }
}

export { ReturnBookingController };
