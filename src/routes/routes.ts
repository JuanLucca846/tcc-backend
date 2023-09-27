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
import uploadConfig from "../config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/users", isAuthenticated, new DetailUserController().handle);

router.post(
  "/book",
  isAuthenticated,
  upload.single("file"),
  new CreateBookController().handle
);
router.get("/book", isAuthenticated, new ListBookController().handle);
router.delete("/book/:id", isAuthenticated, new RemoveBookController().handle);
router.put("/book/:id", isAuthenticated, new UpdateBookController().handle);
export default router;
