import prismaClient from "../../prisma/prismaClient";

class StatusService {
  async execute() {
    try {
      const totalBooks = await prismaClient.books.count();
      const totalPendingBooks = await prismaClient.loans.count();
      const totalUsers = await prismaClient.users.count();
      const totalBorrowedBooks = await prismaClient.reservations.count();

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
