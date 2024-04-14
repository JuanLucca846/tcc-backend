import { Request, Response } from "express";

import { AppError } from "../../errors/AppError";
import { CreateCategoryService } from "../../services/categories/createCategory.service";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const createCategoryService = new CreateCategoryService();

    const { name } = req.body;

    const category = await createCategoryService.execute({
      name,
    });

    res.status(201).json(category);
  }
}

export { CreateCategoryController };
