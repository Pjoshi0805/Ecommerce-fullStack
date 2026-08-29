import { useState } from "react"
import { createProduct } from "../../../api/productApi"
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
function CreateProduct() {
    const navigate = useNavigate()
    const {token} = useAuth()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')

    return (<form onSubmit={async (e)=>{
        e.preventDefault()
         try {
        const newProduct = { title, price, stock, category, image }
        await createProduct(newProduct, token)
        navigate('/admin')
    } catch (error) {
        console.error(error)
    }
    }}>
        <label>Title</label>
        <input
            type='text'
            value={title}
            onChange={(e) => {
                setTitle(e.target.value)
            }}
        />
        <label>Price</label>
        <input
            type='number'
            value={price}
            onChange={(e) => {
                setPrice(e.target.value)
            }}
        />
        <label>stock</label>
        <input
            type='number'
            value={stock}
            onChange={(e) => {
                setStock(e.target.value)
            }}
        />
        <label>Category</label>
        <select
            value={category}
            onChange={(e) => {
                setCategory(e.target.value)
            }}
        >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="shoes">Shoes</option>
            <option value="clothes">Clothes</option>
            <option value="books">Books</option>
            <option value="sports">Sports</option>
        </select>
        <label>Image</label>
        <input
            type='text'
            value={image}
            onChange={(e) => {
                setImage(e.target.value)
            }}
        />
        <button type="submit">Create Product</button>
    </form>
    )
}

export default CreateProduct