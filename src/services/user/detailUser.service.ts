import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

class DetailUserService {
  async execute(user_id: number) {
    const user = await prismaClient.users.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        admin: true,
      },
    });

    if (!user) {
      throw new AppError("User not found");
    }

    return user;
  }
}

export { DetailUserService };
