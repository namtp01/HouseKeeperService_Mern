import express from "express"
import dotenv from "dotenv"
import connectDatabase from "./config/MongoDb.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors";

dotenv.config()
connectDatabase()

const app = express()

app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
//app.use("/users", userRoute)
//app.use("/reviews", reviewRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage)
})




const PORT = process.env.PORT || 1000
app.listen(PORT, console.log(`server running on port ${PORT}`))