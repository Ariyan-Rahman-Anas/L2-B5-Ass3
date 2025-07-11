import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { borrowValidateSchema } from "./borrow.validation";
import { borrowControllers } from "./borrow.controller";

const router = Router()

router.post("/", validateRequest(borrowValidateSchema), borrowControllers.borrowBook)
router.get("/", borrowControllers.borrowedBooks )

export const BorrowRoutes = router