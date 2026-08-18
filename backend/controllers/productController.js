import mongoose from "mongoose"
import Product from "../models/Product.js"

export async function getProducts(req, res) {
    const products = await Product.find()

    res.json(products)
}

export async function getProductById(req, res) {
    const { id } = req.params
    const isValid = mongoose.isValidObjectId(id)

    if (!isValid) {
        return res.status(400).json({ error: 'Invalid Id' })
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({ error: 'Product Not Found' })
    }

    return res.status(200).json(product)

}


export async function createProduct(req, res) {
    try {
        const { title, price, stock } = req.body

        const { id } = req.user


        const product = await Product.create({
            title,
            price,
            stock,
            seller: id
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ error: 'Invalid product data' })
    }
}

export async function updateProduct(req, res) {
    const { id } = req.params
    const isValid = mongoose.isValidObjectId(id)
    if (!isValid) {
        return res.status(400).json({ error: 'Invalid Id' })
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({ error: 'Not Found' })
    }

    if (req.user.role !== 'admin' && product.seller.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' })
    }

    const updates = req.body

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updates,
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedProduct) {
        return res.status(404).json({ error: 'Product Not Found' })
    }

    return res.status(200).json(updatedProduct)
}


export async function deleteProduct(req, res) {
    const { id } = req.params
    const isValid = mongoose.isValidObjectId(id)

    if (!isValid) {
        return res.status(400).json({ error: 'Invalid Id' })
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(404).json({ error: "Product Not Found" })
    }

    if (req.user.role !== 'admin' && product.seller.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized' })
    }


    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
        return res.status(404).json({ error: "Product Not Found" })
    }

    return res.status(200).json(deletedProduct)
}