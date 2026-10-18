import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import mongoose from "mongoose"
export async function createUser(req, res) {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "customer"
    })
    if (!user) {
        return res.status(400).json({ error: 'Creation failed' })
    }

    return res.status(201).json(user)
}


export async function loginUser(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }

    if (user && user.isActive === false) {
    return res.status(403).json({
        error: "Your account has been deactivated. Please contact the administrator."
    })
}

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }

    const tokenInfo = {
        id: user._id,
        role: user.role
    }
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(tokenInfo, secret)

    return res.status(200).json({ token })
}

export async function getCurrentUser(req, res) {
    const { id } = req.user

    const user = await User.findById(id).select('-password')

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json(user)

}


export async function getAllUsers(req, res) {
    const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 });

    return res.status(200).json(users);
}



export async function updateCurrentUser(req, res) {
    const { id } = req.user
    const { name } = req.body

    if (!name || !name.trim()) {
        return res.status(400).json({
            error: "Name is required"
        })
    }

    const user = await User.findByIdAndUpdate(
        id,
        { name: name.trim() },
        {
            new: true,
            runValidators: true
        }
    ).select("-password")

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    return res.status(200).json(user)
}

export async function changePassword(req, res) {
    const { id } = req.user
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            error: "Current password and new password are required"
        })
    }

    if (newPassword.length < 8) {
        return res.status(400).json({
            error: "New password must be at least 8 characters long"
        })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
    )

    if (!isPasswordCorrect) {
        return res.status(400).json({
            error: "Current password is incorrect"
        })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    return res.status(200).json({
        message: "Password updated successfully"
    })
}


export async function updateUserStatus(req, res) {
    const { id } = req.params
    const { isActive } = req.body

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: "Invalid user ID"
        })
    }

    if (typeof isActive !== "boolean") {
        return res.status(400).json({
            error: "isActive must be true or false"
        })
    }

    // Prevent an admin from deactivating their own account.
    if (id === req.user.id) {
        return res.status(400).json({
            error: "You cannot deactivate your own account"
        })
    }

    const user = await User.findByIdAndUpdate(
        id,
        { isActive },
        { new: true, runValidators: true }
    ).select("-password")

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    return res.status(200).json(user)
}