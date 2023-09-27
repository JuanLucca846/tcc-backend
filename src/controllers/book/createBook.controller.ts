import { Request, Response } from "express";
import { CreateBookService } from "../../services/book/createBook.service";
import { AppError } from "../../errors/AppError";

class CreateBookController {
  async handle(req: Request, res: Response) {
    const createBookService = new CreateBookService();

    const { title, author, category, cover, quantity } = req.body;

    if (!req.file) {
      throw new AppError("Error");
    } else {
      const { originalname, filename: cover } = req.file;

      const book = await createBookService.execute({
        title,
        author,
        category,
        cover,
        quantity,
      });

      return res.json(book);
    }
  }
}

export { CreateBookController };
