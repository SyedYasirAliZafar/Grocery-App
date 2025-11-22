import express from 'express'
import { isAuthUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js'

const router = express.Router()

// User Register Route
router.post("/register", registerUser)

// User Login Route
router.post("/login", loginUser)

// User Logout Route
router.get("/logout", isLoggedIn, logoutUser)

// isAuthUser
router.get("/is-auth", isLoggedIn, isAuthUser)

export default router
