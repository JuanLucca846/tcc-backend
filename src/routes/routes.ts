import { Router, Request, Response } from "express";
import { CreateUserController } from "../controllers/user/createUser.controller";
import { AuthUserController } from "../controllers/user/authUser.controller";
import { DetailUserController } from "../controllers/user/detailUser.controller";
import { isAuthenticated } from "../middlewares/userAuthenticated";
import { CreateBookController } from "../controllers/book/createBook.controller";

const router = Router();

router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/users", isAuthenticated, new DetailUserController().handle);

router.post("/book", isAuthenticated, new CreateBookController().handle);

export default router;
