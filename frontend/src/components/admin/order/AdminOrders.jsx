import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { getOrders } from "../../../api/orderApi"
import AdminOrderCard from "./AdminOrderCard"

function AdminOrders() {
    const { token } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true)

            try {
                const data = await getOrders(token)
                setOrders(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchOrders()
        }
    }, [token])

    function handleOrderUpdated(id, newStatus) {
    setOrders(currentOrders =>
        currentOrders.map(order =>
            order._id === id
                ? { ...order, status: newStatus }
                : order
        )
    )
}

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (orders.length === 0) {
        return <div>No orders yet...</div>
    }

    return(
        <div className="admin-orders">
    <h2>Manage Orders</h2>
    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
                <AdminOrderCard
                    key={order._id}
                    order={order}
                    onUpdate={handleOrderUpdated}
                />
            ))}
        </tbody>
    </table>
</div>
    )

}

export default AdminOrders