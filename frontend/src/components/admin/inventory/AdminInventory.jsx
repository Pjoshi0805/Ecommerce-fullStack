import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { getProducts, updateProduct } from "../../../api/productApi"

function AdminInventory() {
    const { token } = useAuth()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [stockInputs, setStockInputs] = useState({})
    const [savingId, setSavingId] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    function handleStockInput(id, value) {
        setStockInputs(current => ({
            ...current,
            [id]: value
        }))
    }

    async function handleStockUpdate(product) {
        const value = stockInputs[product._id]

        if (value === undefined || value === "") {
            alert("Enter a stock quantity.")
            return
        }

        const stock = Number(value)

        if (!Number.isInteger(stock) || stock < 0) {
            alert("Stock must be a non-negative whole number.")
            return
        }

        setSavingId(product._id)

        try {
            const updatedProduct = await updateProduct(
                product._id,
                { stock },
                token
            )

            setProducts(current =>
                current.map(item =>
                    item._id === product._id
                        ? { ...item, ...updatedProduct }
                        : item
                )
            )

            setStockInputs(current => {
                const next = { ...current }
                delete next[product._id]
                return next
            })
        } catch (error) {
            alert(error.message)
        } finally {
            setSavingId(null)
        }
    }

    if (loading) return <p>Loading inventory...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="admin-inventory">
            <h2>Inventory Management</h2>

            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Current Stock</th>
                            <th>Stock Status</th>
                            <th>Update Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => {
                            const stock = Number(product.stock)

                            const status =
                                stock === 0
                                    ? "Out of Stock"
                                    : stock <= 5
                                        ? "Low Stock"
                                        : "In Stock"

                            return (
                                <tr key={product._id}>
                                    <td>{product.title}</td>
                                    <td>{product.category}</td>
                                    <td>{stock}</td>
                                    <td>{status}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            aria-label={`New stock for ${product.title}`}
                                            placeholder={String(stock)}
                                            value={
                                                stockInputs[product._id] ?? ""
                                            }
                                            onChange={event =>
                                                handleStockInput(
                                                    product._id,
                                                    event.target.value
                                                )
                                            }
                                        />

                                        <button
                                            disabled={savingId === product._id}
                                            onClick={() =>
                                                handleStockUpdate(product)
                                            }
                                        >
                                            {savingId === product._id
                                                ? "Saving..."
                                                : "Save"}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminInventory
