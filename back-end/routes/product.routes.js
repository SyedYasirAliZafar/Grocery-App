import express from 'express'
import { authSeller } from '../middlewares/authSeller.js'
import {upload} from '../config/multer.js'
import { addProduct, changeStock, getProducts, getProductsById } from '../controllers/product.controller.js'

const router = express.Router()

// add Product Route
router.post('/add-product', authSeller, upload.array('image',4), addProduct)

router.get('/list', getProducts)
router.get('/:id', getProductsById)
router.put('/stock', authSeller, changeStock)

export default router
