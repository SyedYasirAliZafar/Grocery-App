import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/connectDB.js'
import { connectCloudinary } from './config/cloudinary.js'
import userRoutes from './routes/user.routes.js'
import sellerRoutes from './routes/seller.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'

dotenv.config()

const app = express()

// MongoDB Connected
connectDB()

// Cloudinary Connected
connectCloudinary()

// Allowed Frontend Origins
const allowedOrigins = ["http://localhost:5173"]

// Middlewares
app.use(express.json())
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(cookieParser())

// Test Route
app.get('/', (req, res) => {
  res.send('Grocery App Backend!')
})

// User Route
app.use("/api/user", userRoutes)

// Seller Routes
app.use("/api/seller", sellerRoutes)

// Product Routes
app.use("/api/product", productRoutes)

// Cart Routes
app.use("/api/cart", cartRoutes)

// PORT
const PORT = process.env.PORT || 5000

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
