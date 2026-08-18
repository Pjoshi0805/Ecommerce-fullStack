import express from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProductById)

router.post('/', authMiddleware, authorize('admin', 'retailer'), createProduct)

router.patch('/:id', authMiddleware, authorize('admin', 'retailer'), updateProduct)

router.delete('/:id', authMiddleware, authorize('admin', 'retailer'), deleteProduct)

export default router