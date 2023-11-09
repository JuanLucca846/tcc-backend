import { Router, Request, Response } from "express";
import multer from "multer";
import { CreateUserController } from "../controllers/user/createUser.controller";
import { AuthUserController } from "../controllers/user/authUser.controller";
import { DetailUserController } from "../controllers/user/detailUser.controller";
import { isAuthenticated } from "../middlewares/userAuthenticated";
import { CreateBookController } from "../controllers/book/createBook.controller";
import { ListBookController } from "../controllers/book/listBook.controller";
import { RemoveBookController } from "../controllers/book/removeBook.controller";
import { UpdateBookController } from "../controllers/book/updateBook.controller";
import { CreateBookingController } from "../controllers/userhasbooks/createBooking.controller";
import { ListBookingController } from "../controllers/userhasbooks/listBooking.controller";
import { ReturnBookingController } from "../controllers/userhasbooks/returnBooking.controller";

const router = Router();

router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/users", isAuthenticated, new DetailUserController().handle);

router.post("/book", isAuthenticated, new CreateBookController().handle);
router.get("/book", isAuthenticated, new ListBookController().handle);
router.delete("/book/:id", isAuthenticated, new RemoveBookController().handle);
router.put("/book/:id", isAuthenticated, new UpdateBookController().handle);

router.post("/rentbook", isAuthenticated, new CreateBookingController().handle);
router.get(
  "/user/:id/rentedbooks",
  isAuthenticated,
  new ListBookingController().handle
);
router.post(
  "/returnrentedbook",
  isAuthenticated,
  new ReturnBookingController().handle
);

export default router;
