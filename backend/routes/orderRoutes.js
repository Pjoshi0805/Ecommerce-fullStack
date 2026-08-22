import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware.js"
import { createOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/orderController.js"
import { authorize } from '../middleware/roleMiddleware.js'
const router = express.Router()

router.post('/', authMiddleware, createOrder)
router.get('/', authMiddleware, getOrders)
router.get('/:id', authMiddleware, getOrderById)
router.patch('/:id/status', authMiddleware, authorize('admin'), updateOrderStatus)
export default router