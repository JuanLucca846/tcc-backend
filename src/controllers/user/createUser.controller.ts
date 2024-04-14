import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUser.service";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, courseId } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      courseId,
    });

    return res.json(user);
  }
}

export { CreateUserController };
