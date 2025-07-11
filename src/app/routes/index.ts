import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";
import { BorrowRoutes } from "../modules/borrow/borrow.route";

const router = Router()
const modulesRoutes = [ 
    {
        path: "/books",
        route:BookRoutes
    },
    {
        path: "/borrows",
        route: BorrowRoutes
    }
]

modulesRoutes.forEach((route) => router.use(route.path, route.route))
export default router