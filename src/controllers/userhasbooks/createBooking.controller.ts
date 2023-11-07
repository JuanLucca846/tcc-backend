import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { CreateBookingService } from "../../services/userhasbooks/createBooking.service";

class CreateBookingController {
  async handle(req: Request, res: Response) {
    const createBookingService = new CreateBookingService();

    const { userId, bookId } = req.body;

    const booking = await createBookingService.execute({
      userId,
      bookId,
    });

    return res.json(booking);
  }
}

export { CreateBookingController };
