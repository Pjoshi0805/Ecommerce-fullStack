export function authorize(...allowedRoles) {
    return function (req, res, next) {
        const { role } = req.user

        const isAllowed = allowedRoles.includes(role)

        if (!isAllowed) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        next()
    }
}

