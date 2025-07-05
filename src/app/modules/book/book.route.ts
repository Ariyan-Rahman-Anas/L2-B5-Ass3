import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookValidateSchema } from "./book.validation";
import { bookControllers } from "./book.controller";

const router = Router()

// create book
router.post("/", validateRequest(bookValidateSchema), bookControllers.createBook)
router.get("/", bookControllers.getBooks)
router.get("/:id", bookControllers.getSingleProductById)


export const BookRoutes = router;