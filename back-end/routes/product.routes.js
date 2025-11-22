import express from 'express'
import { authSeller } from '../middlewares/authSeller.js'
import {upload} from '../config/multer.js'
import { addProduct, changeStock, getProducts, getProductsById } from '../controllers/product.controller.js'

const router = express.Router()

// add Product Route
router.post('/add-product', upload.array('images'),authSeller, addProduct)

router.get('/list', getProducts)
router.get('/id', getProducts)
router.get('/id', getProductsById)
router.get('/stock', authSeller, changeStock)

export default router
