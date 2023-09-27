import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, cpf, email, password }: UserRequest) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

    if (!email) {
      throw new AppError("Email required");
    }

    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email format");
    }

    if (!cpfRegex.test(cpf)) {
      throw new AppError("Invalid cpf format");
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
        cpf: cpf,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        cpf: true,
        name: true,
        email: true,
      },
    });

    return newUser;
  }
}

export { CreateUserService };
