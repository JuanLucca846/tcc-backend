import { Request, Response } from "express";
import { ListLoanService } from "../../services/loan/listLoan.service";



class ListLoanController {
  async handle(req: Request, res: Response) {
    const listLoanService = new ListLoanService();

    const userId = Number(req.user_id);

    const loans = await listLoanService.execute({userId});

    return res.json({ loans });
  }
}

export { ListLoanController };
