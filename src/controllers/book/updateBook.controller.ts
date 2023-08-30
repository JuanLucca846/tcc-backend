import { Request, Response } from "express";
import { UpdateBookService } from "../../services/book/updateBook.service";

class UpdateBookController {
  async handle(req: Request, res: Response) {
    const book_id = Number(req.params.id);

    const { title, author, quantity } = req.body;

    const updateBook = new UpdateBookService();

    const book = await updateBook.execute({
      book_id,
      title,
      author,
      quantity,
    });

    return res.json(book);
  }
}

export { UpdateBookController };
