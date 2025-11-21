import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/connectDB.js'

dotenv.config()

const app = express()

// MongoDB Connected
connectDB()

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

// PORT
const PORT = process.env.PORT || 5000

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
