import jwt from 'jsonwebtoken'
import 'dotenv/config'
export async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: 'Invalid request' })
    }
    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedToken

        next()
    } catch (error) {

        return res.status(401).json({
            error: 'Unauthorized'
        })
    }
}