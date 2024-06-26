import { Request, Response } from "express";
import { RemoveBookService } from "../../services/book/removeBook.service";

class RemoveBookController {
  async handle(req: Request, res: Response) {
    const book_id = Number(req.params.id);

    const removeBookService = new RemoveBookService();

    const book = await removeBookService.execute({
      book_id,
    });

    return res.json(book);
  }
}

export { RemoveBookController };
