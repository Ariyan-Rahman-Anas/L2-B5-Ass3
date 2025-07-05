import dotenv from "dotenv"
dotenv.config()

export const config = {
    localServerPort: process.env.PORT ? Number(process.env.PORT) : 3000,
    dbUri: process.env.DB_URI as string,
}