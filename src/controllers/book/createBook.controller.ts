import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { CreateBookService } from "../../services/book/createBook.service";

class CreateBookController {
  async handle(req: Request, res: Response) {
    const createBookService = new CreateBookService();

    const { title, author, description, isbn, shelf, bookcase, categoryId } = req.body;

    if (!req.file) {
      throw new AppError("Error");
    } else {
      const { originalname, filename: coverImage } = req.file;

      

      const book = await createBookService.execute({
        title,
        author,
        description,
        coverImage,
        isbn,
        shelf,
        bookcase,
        categoryId: parseInt(categoryId, 10),
      });

      res.status(201).json(book);
    }
  }
}

export { CreateBookController };
