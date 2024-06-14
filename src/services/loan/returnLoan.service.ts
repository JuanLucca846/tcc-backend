import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface ReturnLoanRequest {
  loanId: number;
}

class ReturnLoanService {
  async execute({ loanId }: ReturnLoanRequest) {
    const returnLoan = await prismaClient.loans.update({
      where: { id: loanId },
      data: {
        returnedAt: new Date(),
      },
    });

    await prismaClient.books.update({
      where: { id: returnLoan.bookId },
      data: { status: "Disponível" },
    });
  }
}

export { ReturnLoanService };
