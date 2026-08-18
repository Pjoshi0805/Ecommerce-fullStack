import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
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