import { AppError } from "../../errors/AppError";
import prismaClient from "../../prisma/prismaClient";

interface ReturnLoanRequest {
  loanId: number;
}

class ReturnLoanService {
  async execute({ loanId }: ReturnLoanRequest) {
    const loan = await prismaClient.loans.findUnique({
      where: { id: loanId },
    });

    if (!loan) {
      throw new AppError("Loan not found");
    }

    if (loan.returnedAt) {
      throw new AppError("Loan has already been returned");
    }

    await prismaClient.loans.update({
      where: { id: loanId },
      data: { returnedAt: new Date() },
    });
  }
}

export { ReturnLoanService };
