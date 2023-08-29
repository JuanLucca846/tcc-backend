import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const checkUserEmailAndPass = await prismaClient.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkUserEmailAndPass) {
      throw new AppError("Email or Password incorrect");
    }

    const checkPass = await compare(password, checkUserEmailAndPass.password);

    if (!checkPass) {
      throw new AppError("Email or Password incorrect");
    }

    const token = sign(
      {
        name: checkUserEmailAndPass.name,
        email: checkUserEmailAndPass.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: checkUserEmailAndPass.id.toString(),
        expiresIn: "1d",
      }
    );

    return {
      id: checkUserEmailAndPass.id,
      name: checkUserEmailAndPass.name,
      email: checkUserEmailAndPass.email,
      token: token,
    };
  }
}

export { AuthUserService };
