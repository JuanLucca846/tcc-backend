import { Request, Response } from "express";
import { ListBookService } from "../../services/book/listBook.service";

class ListBookController {
  async handle(req: Request, res: Response) {
    const listBookService = new ListBookService();

    const skip = Number(req?.query?.skip) || 1;
    const take = Number(req?.query?.take) || 5;

    const book = await listBookService.execute(skip, take);

    return res.json(book);
  }
}

export { ListBookController };
