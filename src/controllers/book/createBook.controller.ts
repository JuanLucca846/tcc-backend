import { Request, Response } from "express";
import { CreateBookService } from "../../services/book/createBook.service";

class CreateBookController {
  async handle(req: Request, res: Response) {
    const createBookService = new CreateBookService();

    const { title, author, quantity } = req.body;

    const book = await createBookService.execute({
      title,
      author,
      quantity,
    });

    return res.json(book);
  }
}

export { CreateBookController };
