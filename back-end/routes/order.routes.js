import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js'
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/order.controller.js'
import { authSeller } from '../middlewares/authSeller.js'

const router = express.Router()

router.post("/cod", isLoggedIn, placeOrderCOD)
router.get("/user", isLoggedIn, getUserOrders)
router.post("/seller", authSeller, getAllOrders)


export default router
