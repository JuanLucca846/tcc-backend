import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  courseId: number;
}

class CreateUserService {
  async execute({ name, email, password, courseId }: UserRequest) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      throw new AppError("Email required");
    }

    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email format");
    }

    const userAlreadyExists = await prismaClient.users.findUnique({
      where: {
        email,
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
        courseId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        courseId: true,
      },
    });

    return newUser;
  }
}

export { CreateUserService };
