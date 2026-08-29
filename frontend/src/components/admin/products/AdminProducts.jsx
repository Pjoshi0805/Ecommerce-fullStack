import { useEffect, useState } from "react"
import { getProducts } from "../../../api/productApi"
import AdminProductCard from "./AdminProductCard"
import './AdminProducts.css'
import { Link } from "react-router-dom"

function AdminProducts() {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    function handleProductDeleted(id) {
        setProducts(currentProducts =>
            currentProducts.filter(product => product._id !== id)
        )
    }
    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true)
                const data = await getProducts()
                setProducts(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [])

    if (loading) {
        return <div>Loading....</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    if (!products || products.length === 0) {
        return <div>No products yet...</div>
    }

    return (
        <div className="admin-products">
            <h2>Manage Products</h2>
            <Link to="/admin/products/new">
                Add Product
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <AdminProductCard
                            key={product._id}
                            product={product}
                            onDelete={handleProductDeleted}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminProducts