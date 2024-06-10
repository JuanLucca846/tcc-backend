import { Request, Response } from 'express';
import { CreateLoanService } from '../../services/loan/createLoan.service';


class CreateLoanController{
    async handle(req: Request, res: Response) {

        const createLoanService = new CreateLoanService();

    const { userId, bookId, dueDate } = req.body;

    const newLoan = createLoanService.execute({
        userId, 
        bookId, 
        dueDate
    });

    res.status(201).json(newLoan);

}
}

export {CreateLoanController};