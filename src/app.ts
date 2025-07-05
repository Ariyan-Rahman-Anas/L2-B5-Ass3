import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./app/routes"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"

dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(cors())

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to the server!")
})

// main routes
app.use("/api", router)

// global error handler
app.use(globalErrorHandler)

// not found
app.use(notFound)

export default app
