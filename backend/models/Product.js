import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['electronics', 'shoes', 'clothes', 'books', 'sports'],
        required: true
    },
    image: {
        type: String,
        required: true
    }

})

const Product = mongoose.model('Product', productSchema)

export default Product