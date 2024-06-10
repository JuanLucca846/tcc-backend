import prismaClient from "../../prisma/prismaClient";

export interface loanRequest {
  userId: number;
}

class ListLoanServiceAdmin {
  async execute() {
    const loanedBooks = await prismaClient.loans.findMany({  
      select: {
        id: true,
        book: {
          select: {
            id: true,
            isbn: true,
            title: true,
            author: true,
            coverImage: true,
            description: true,
            status: true,
          },
        },
        user: {
          select:{
            name: true,
          }
        },
        dueDate: true,
        returnedAt: true,
      },
    });

    return loanedBooks;
  }
}

export { ListLoanServiceAdmin };
