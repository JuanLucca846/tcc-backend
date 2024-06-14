import prismaClient from "../../prisma/prismaClient";

class StatusService {
  async execute() {
    try {
      const totalBooks = await prismaClient.books.count();
      const totalUsers = await prismaClient.users.count();
      const totalPendingBooks = await prismaClient.loans.count({
        where: {
          returnedAt: null,
          dueDate:{
            lt: new Date(),
          }
        }
      });
      const totalBorrowedBooks = await prismaClient.loans.count({
        where:{
          returnedAt: null,  
        }
      });

      return {
        totalBooks,
        totalPendingBooks,
        totalUsers,
        totalBorrowedBooks,
      };
    } catch (error) {
      throw new Error("Error fetching status");
    }
  }
}

export { StatusService };
