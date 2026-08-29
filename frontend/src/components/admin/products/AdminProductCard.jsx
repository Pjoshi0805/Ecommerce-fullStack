import { Link } from "react-router-dom"
import { deleteProduct } from "../../../api/productApi"
import useAuth from "../../../hooks/useAuth"
function AdminProductCard({ product,onDelete }) {
    const { token } = useAuth()
    return (
        <tr>
            <td>{product.name}</td>
            <td>₹{product.price}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>
                <Link to={`/admin/products/${product._id}/edit`}>
                    Edit
                </Link>
                <button onClick={async () => {
                    try {
                        await deleteProduct(product._id, token)
                        onDelete(product._id)
                    } catch (error) {
                        console.error(error.message)
                    }
                }}>Delete</button>
            </td>
        </tr>
    )
}

export default AdminProductCard