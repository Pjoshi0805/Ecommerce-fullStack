import express from "express";
import { createUser, loginUser, getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router()

router.post('/', createUser)

router.get('/me', authMiddleware, getCurrentUser)

router.post('/login', loginUser)
export default router