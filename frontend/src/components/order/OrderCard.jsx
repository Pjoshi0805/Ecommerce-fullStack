import { Link } from "react-router-dom"

function OrderCard({ order }) {
  return (
    <div className="order-card">
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      <Link to={`/orders/${order._id}`}>View Details</Link>
    </div>
  )
}

export default OrderCard