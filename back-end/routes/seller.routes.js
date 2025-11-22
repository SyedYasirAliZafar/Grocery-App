import express from 'express'
import { isAuthSeller, sellerLogin, sellerLogout } from '../controllers/seller.controller'
import { authSeller } from '../middlewares/authSeller'

const router = express.Router()

// Seller Login Route
router.post('/login', sellerLogin)

// Seller Logout Route
router.post('/logout', authSeller ,sellerLogout)

// isAuthSeller
router.get("/is-auth", authSeller, isAuthSeller)

export default router
