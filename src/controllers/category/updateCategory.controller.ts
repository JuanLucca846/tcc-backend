import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/categories/updateCategory.service";

class UpdateCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = Number(req.params.id);

    const { name } = req.body;

    const updateCategoryService = new UpdateCategoryService();

    const course = await updateCategoryService.execute({
      category_id,
      name,
    });

    return res.json(course);
  }
}

export { UpdateCategoryController };
