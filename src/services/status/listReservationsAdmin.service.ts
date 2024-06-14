import prismaClient from "../../prisma/prismaClient";

class ListReservationServiceAdmin {
  async execute() {
    const reservedBooks = await prismaClient.reservations.findMany({  
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
        reservedAt: true,
      },
    });

    return reservedBooks;
  }
}

export { ListReservationServiceAdmin };
