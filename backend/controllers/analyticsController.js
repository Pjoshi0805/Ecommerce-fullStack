
import Order from "../models/Order.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

export async function getAdminAnalytics(req, res) {
    const [
        totalOrders,
        pendingOrders,
        totalProducts,
        totalCustomers,
        revenueResult
    ] = await Promise.all([
        Order.countDocuments(),
        Order.countDocuments({ status: "pending" }),
        Product.countDocuments(),
        User.countDocuments({ role: "customer" }),
        Order.aggregate([
            {
                $match: {
                    status: { $ne: "cancelled" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ])
    ])

    const totalRevenue = revenueResult[0]?.totalRevenue ?? 0

    return res.status(200).json({
        totalRevenue,
        totalOrders,
        pendingOrders,
        totalProducts,
        totalCustomers
    })
}