import { Link } from "react-router-dom"
import { updateOrderStatus } from "../../../api/orderApi"
import useAuth from "../../../hooks/useAuth"

const allowedStatuses = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: []
}

function AdminOrderCard({ order, onUpdate }) {
    const { token } = useAuth()
    const nextStatuses = allowedStatuses[order.status] || []

    async function handleStatusChange(newStatus) {
        if (!window.confirm(`Mark order "${order._id}" as "${newStatus}"?`)) return
        try {
            await updateOrderStatus(order._id, newStatus, token)
            onUpdate(order._id, newStatus)
        } catch (error) {
            console.error(error.message)
            alert("Failed to update order: " + error.message)
        }
    }

    return (
        <tr>
            <td>{order._id}</td>
            <td>{order.status}</td>
            <td>₹{order.totalAmount}</td>
            <td>
                {nextStatuses.length > 0 ? (
                    <select
                        value=""
                        onChange={(e) => {
                            if (e.target.value) {
                                handleStatusChange(e.target.value)
                            }
                        }}
                    >
                        <option value="">Change status...</option>
                        {nextStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span>No actions</span>
                )}
                <Link to={`/admin/orders/${order._id}`}>
                    View Details
                </Link>
            </td>
        </tr>
    )
}

export default AdminOrderCard