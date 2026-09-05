import { useEffect, useState } from "react"
import { getProducts } from "../../../api/productApi"
import { getOrders } from "../../../api/orderApi"
import useAuth from "../../../hooks/useAuth"

function AdminDashboard() {
    const { token } = useAuth()

    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true)

            try {
                const [productsData, ordersData] = await Promise.all([
                    getProducts(),
                    getOrders(token)
                ])

                setProducts(productsData)
                setOrders(ordersData)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchDashboardData()
        }
    }, [token])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const totalProducts = products.length

    const totalOrders = orders.length

    const pendingOrders = orders.filter(
        order => order.status === "pending"
    ).length

    const totalRevenue = orders
        .filter(order => order.status !== "cancelled")
        .reduce(
            (total, order) => total + order.totalAmount,
            0
        )

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <p>{totalOrders}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Pending Orders</h3>
                    <p>{pendingOrders}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Revenue</h3>
                    <p>₹{totalRevenue}</p>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard