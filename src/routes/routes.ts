import { Router, Request, Response } from "express";
import { CreateUserController } from "../controllers/user/createUser.controller";
import { AuthUserController } from "../controllers/user/authUser.controller";
import { DetailUserController } from "../controllers/user/detailUser.controller";
import { isAuthenticated } from "../middlewares/userAuthenticated";

const router = Router();

router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/users", isAuthenticated, new DetailUserController().handle);

export default router;
