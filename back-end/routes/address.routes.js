import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js'
import { authSeller } from '../middlewares/authSeller.js'
import { addAddress, getAddress } from '../controllers/address.controller.js'

const router = express.Router()

router.post("/add", isLoggedIn, addAddress)
router.get("/get", isLoggedIn, getAddress)


export default router
