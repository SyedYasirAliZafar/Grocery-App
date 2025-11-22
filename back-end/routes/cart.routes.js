import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js'
import { updateCart } from '../controllers/cart.controller.js'


const router = express.Router()

router.post("/update", isLoggedIn, updateCart)


export default router
