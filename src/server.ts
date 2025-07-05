import { Server } from "http"
import mongoose from "mongoose"
import { config } from "./app/config"
import app from "./app"

let server: Server

async function main() {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        console.log("DB Connected successfully!")

        server = app.listen(config.localServerPort, () => {
            console.log(`Server is running at http://localhost:${config.localServerPort}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error)
    }
}

main()