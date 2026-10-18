
import express from "express"

import {
    createUser,
    loginUser,
    getCurrentUser,
    getAllUsers,
    updateCurrentUser,
    changePassword,
    updateUserStatus
} from "../controllers/userController.js"

import { authMiddleware } from "../middleware/authMiddleware.js"
import { authorize } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post('/', createUser)

router.post('/login', loginUser)

router.get('/me', authMiddleware, getCurrentUser)
router.patch('/me', authMiddleware, updateCurrentUser)
router.patch('/me/password', authMiddleware, changePassword)

router.patch(
    "/admin/users/:id/status",
    authMiddleware,
    authorize("admin"),
    updateUserStatus
)

router.get('/admin/users', authMiddleware, authorize('admin'), getAllUsers)

export default router