import { Request, Response } from "express";
import { ListLoanServiceAdmin } from "../../services/status/listLoansAdmin.service";

class ListLoanControllerAdmin {
  async handle(req: Request, res: Response) {
    const listLoanService = new ListLoanServiceAdmin();

    const loans = await listLoanService.execute();

    return res.json({ loans });
  }
}

export { ListLoanControllerAdmin };
