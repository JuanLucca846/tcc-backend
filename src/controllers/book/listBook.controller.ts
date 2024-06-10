import { Request, Response } from "express";
import { ListBookService } from "../../services/book/listBook.service";

class ListBookController {
  async handle(req: Request, res: Response) {
    const listBookService = new ListBookService();

    const page = Number(req?.query?.skip) || 1;
    const limit = Number(req?.query?.take) || 12;
    const isbn = req.query.isbn as string;
    const title = req.query.title as string;
    const author = req.query.author as string;
    const category = req.query.category as string;

    const book = await listBookService.execute({
      page,
      limit,
      isbn,
      title,
      author,
      category,
    });

    return res.json(book);
  }
}

export { ListBookController };
