import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface CreateLoaanRequest {
  userId: number;
  bookId: number;
  dueDate: Date;
}

class CreateLoanService {
  async execute({ userId, bookId, dueDate }: CreateLoaanRequest) {
    const createLoan = await prismaClient.loans.create({
      data: {
        userId,
        bookId,
        dueDate,
      },
    });

    await prismaClient.books.update({
      where: { id: bookId },
      data: { status: "Emprestado" },
    });

    return createLoan;
  }
}

export { CreateLoanService };
