import prismaClient from "../../prisma/prismaClient";

interface ListLoanRequest{
    userId: number;
}

class ListLoanService{
    async execute({userId}: ListLoanRequest){
        
            const loans = await prismaClient.loans.findMany({
              where: {
                userId,
                returnedAt: null,  
              },
              include: {
                book: true,
              },
            });
      
            return loans;     
    }
}

export { ListLoanService }