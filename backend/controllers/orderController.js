import Product from "../models/Product.js"
import Order from "../models/Order.js"
import mongoose from 'mongoose'
import { AppError } from "../utils/AppError.js"

const allowedTransitions = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: []
}

export async function createOrder(req, res, next) {


    const { id } = req.user

    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
        return next(new AppError('Invalid order items', 400))
    }

    const validation = items.every(item => item.product && item.quantity && item.quantity > 0)

    if (!validation) {
        return next(new AppError('Invalid order items', 400))
    }
    const session = await mongoose.startSession()

    session.startTransaction()
    try {
        const orderedItems = await Promise.all(items.map(async (item) => {
            const { product, quantity } = item

            const productData = await Product.findById(product)

            if (!productData) {
                throw new AppError('Product Not Found', 404)
            }

            if (productData.stock < quantity) {
                throw new AppError('Enough items are not available', 409)
            }

            return ({
                product: productData._id,
                quantity: quantity,
                price: productData.price
            })
        }))

        const totalAmount = orderedItems.reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity)
        }, 0)

        const order = await Order.create([{
            customer: id,
            items: orderedItems,
            totalAmount
        }],
            { session }
        )

        await Promise.all(
            orderedItems.map(async (item) => {
                const { product, quantity } = item

                const updatedItem = await Product.findOneAndUpdate(
                    {
                        _id: product,
                        stock: { $gte: quantity }
                    },
                    {
                        $inc: {
                            stock: -quantity
                        }
                    },
                    { session }
                )
                if (!updatedItem) {
                    throw new AppError('Not Enough Stock', 409)
                }
            })
        )
        await session.commitTransaction()
        return res.status(201).json(order[0])
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}


export async function getOrders(req, res, next) {
    const { id } = req.user

    const orders = await Order.find({
        customer: id
    })
    return res.status(200).json(orders)
}

export async function getOrderById(req, res, next) {
    const { id } = req.params
    const customer = req.user.id
    
    const order = await Order.findOne({
        _id: id,
        customer: customer
    })

    if (!order) {
        return next(new AppError('Order Not Found', 404))
    }

    return res.status(200).json(order)
}

export async function updateOrderStatus(req, res, next) {
    const { id } = req.params
    const { status } = req.body
    const order = await Order.findById(id)

    if (!order) {
        return next(new AppError('Order Not Found', 404))
    }

    const allowed = allowedTransitions[order.status].includes(status)

    if (!allowed) {
        return next(new AppError('Not Allowed', 409))
    }

    order.status = status

    await order.save()

    return res.status(200).json(order)
}