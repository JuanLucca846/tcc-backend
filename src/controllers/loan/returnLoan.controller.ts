import { Request, Response } from "express";
import { ReturnLoanService } from "../../services/loan/returnLoan.service";


class ReturnLoanController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const returnLoanService = new ReturnLoanService();

    await returnLoanService.execute({ loanId: parseInt(id) });
    res.json({ message: "Loan returned successfully" });
  }
}

export { ReturnLoanController };
