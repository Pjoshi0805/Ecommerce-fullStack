import { useEffect, useState } from "react"
import { getProducts } from "../api/productApi"
function useProductData() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return {
        products,
        loading,
        error
    }
}

export default useProductData