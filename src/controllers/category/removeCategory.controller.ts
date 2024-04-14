import { Request, Response } from "express";
import { RemoveCategoryService } from "../../services/categories/removeCategory.service";

class RemoveCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = Number(req.params.id);

    const removeCategoryService = new RemoveCategoryService();

    const category = await removeCategoryService.execute({
      category_id,
    });

    return res.json(category);
  }
}

export { RemoveCategoryController };
