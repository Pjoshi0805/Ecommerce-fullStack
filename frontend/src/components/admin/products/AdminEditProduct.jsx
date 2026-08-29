import { useEffect, useState } from "react"
import { getProductById, updateProduct } from "../../../api/productApi"
import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
function AdminEditProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const {token}= useAuth()
    const [product, setProduct] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    useEffect(() => {
        async function fetchProduct() {
            const data = await getProductById(id)
            setProduct(data)
        }
        fetchProduct()
    }, [id])
    useEffect(() => {
        if (product) {
            setTitle(product.title)
            setPrice(product.price)
            setStock(product.stock)
            setCategory(product.category)
            setImage(product.image)
        }
    }, [product])

    return (<form onSubmit={async (e) => {
        e.preventDefault()
        try {
            const updatedProduct = {
                title,
                price: Number(price),
                stock: Number(stock),
                category,
                image
            }

            await updateProduct(id, updatedProduct, token)
        }catch(error){

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
        <button onClick={()=>{
            navigate('/admin/products')
        }} type="submit">Update Product</button>
    </form>
    )
}

export default AdminEditProduct