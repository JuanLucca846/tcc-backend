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
import { CreateReservationController } from "../controllers/reservation/createReservation.controller";
import { ListReservationController } from "../controllers/reservation/listReservation.controller";
import { CancelReservationController } from "../controllers/reservation/cancelReservation.controller";
import uploadConfig from "../config/multer";
import { CreateCourseController } from "../controllers/course/createCourse.controller";
import { ListCourseController } from "../controllers/course/listCourse.controller";
import { RemoveCourseController } from "../controllers/course/removeCourse.controller";
import { UpdateCourseController } from "../controllers/course/updateCourse.controller";
import { CreateCategoryController } from "../controllers/category/createCategory.controller";
import { ListCategoryController } from "../controllers/category/listCategory.controller";
import { RemoveCategoryController } from "../controllers/category/removeCategory.controller";
import { UpdateCategoryController } from "../controllers/category/updateCategory.controller";
import { CloseReservationController } from "../controllers/reservation/closeReservation.controller";
import { ReturnLoanController } from "../controllers/loan/returnLoan.controller";
import { StatusController } from "../controllers/status/status.controller";
import { CreateLoanController } from "../controllers/loan/createLoan.controller";
import { ListReservationControllerAdmin } from "../controllers/status/listReservationAdmin.controller";
import { ListLoanControllerAdmin } from "../controllers/status/listLoanAdmin.controller";
import { ListLoanController } from "../controllers/loan/listLoan.controller";

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
router.get("/book", new ListBookController().handle);
router.delete("/book/:id", isAuthenticated, new RemoveBookController().handle);
router.put("/book/:id", isAuthenticated, new UpdateBookController().handle);

router.post("/reservations", isAuthenticated, new CreateReservationController().handle);
router.get("/user/reservations", isAuthenticated, new ListReservationController().handle);
router.get("/reservationsAdmin", isAuthenticated, new ListReservationControllerAdmin().handle);
router.delete("/reservations/:id", isAuthenticated, new CancelReservationController().handle);
router.post("/reservationsClose/:id", isAuthenticated, new CloseReservationController().handle);

router.get("/loans", isAuthenticated, new ListLoanControllerAdmin().handle)
router.get("/user/loans", isAuthenticated, new ListLoanController().handle)
router.post("/loan", isAuthenticated, new CreateLoanController().handle)
router.put("/returnLoan/:id", isAuthenticated, new ReturnLoanController().handle);

router.post("/course", new CreateCourseController().handle);
router.get("/course", new ListCourseController().handle);
router.delete("/course/:id", new RemoveCourseController().handle);
router.put("/course/:id", new UpdateCourseController().handle);

router.post("/category", new CreateCategoryController().handle);
router.get("/category", new ListCategoryController().handle);
router.delete("/category/:id", new RemoveCategoryController().handle);
router.put("/category/:id", new UpdateCategoryController().handle);

router.get("/status", new StatusController().handle);

export default router;
