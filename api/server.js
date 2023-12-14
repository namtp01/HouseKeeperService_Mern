import express from "express"
import dotenv from "dotenv"
import connectDatabase from "./config/MongoDb.js"
import authRoute from "./routes/auth.route.js"
import gigRoute from "./routes/gig.route.js"
import userRoute from "./routes/user.route.js"
import reviewRoute from "./routes/review.route.js"
import orderRoute from "./routes/order.route.js"
import conversationRoute from "./routes/conversation.route.js"
import messageRoute from "./routes/message.route.js"
import featureRoute from "./routes/feature.route.js"
import cookieParser from "cookie-parser"
import cors from "cors";

dotenv.config()
connectDatabase()

const app = express()

app.use(cors({ 
    origin: ["http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:5173"], 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
app.use("/api/reviews", reviewRoute)
app.use("/api/features", featureRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage)
})


const PORT = process.env.PORT || 1000
app.listen(PORT, console.log(`server running on port ${PORT}`))