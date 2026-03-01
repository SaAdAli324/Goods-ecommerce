import express from "express"
import cors from "cors"
import multer from "multer"
import { connectDB } from "./Database/db.js"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoute from './routes/ordersRoutes.js'
import userRoute from './routes/userRoute.js'
import bannerRoutes from "./routes/bannerRoutes.js"
import adminLoginRoute from './routes/adminLoginRoute.js'
import adminStatsRoute from './routes/adminStatsRoute.js'
import checkOutRoute from './routes/checkOutRoute.js'
dotenv.config()

const app = express()

const Port = 5000
app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
}))

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use('/uploads', express.static("uploads"))

connectDB()

app.use("/api/product", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api",orderRoute)
app.use("/api" , userRoute)
app.use("/api/banner" , bannerRoutes)
app.use("/api", adminLoginRoute)
app.use("/api/admin",adminStatsRoute)
app.use("/api",checkOutRoute)
app.listen(Port, () => {
    console.log("server running on http://localhost:5000");

})