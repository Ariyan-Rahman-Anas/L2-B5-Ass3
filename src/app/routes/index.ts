import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";

const router = Router()
const modulesRoutes = [ 
    {
        path: "/books",
        route:BookRoutes
    }
]

modulesRoutes.forEach((route) => router.use(route.path, route.route))
export default router