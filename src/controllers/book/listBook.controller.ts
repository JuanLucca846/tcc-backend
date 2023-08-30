import { Request, Response } from "express";
import { ListBookService } from "../../services/book/listBook.service";

class ListBookController {
  async handle(req: Request, res: Response) {
    const listBookService = new ListBookService();

    const book = await listBookService.execute();

    return res.json(book);
  }
}

export { ListBookController };
