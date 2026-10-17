import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'
import { getAdminAnalytics } from '../controllers/analyticsController.js'

const router = express.Router()

router.get('/', authMiddleware, authorize('admin'), getAdminAnalytics)

export default router