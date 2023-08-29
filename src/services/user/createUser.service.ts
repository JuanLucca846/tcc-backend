import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new AppError("Email required");
    }

    const userAlreadyExists = await prismaClient.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 10);

    const newUser = await prismaClient.users.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return newUser;
  }
}

export { CreateUserService };
