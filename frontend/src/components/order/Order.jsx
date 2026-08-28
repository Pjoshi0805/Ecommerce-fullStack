import { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { getOrders } from "../../api/orderApi"
import OrderCard from "./OrderCard"
function Order() {
    const { token } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchOrder() {
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
            fetchOrder()
        }
    }, [token])

    if (loading) {
        return <div>Loading....</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    if (orders.length === 0) {
        return <div>No orders yet...</div>
    }
    return (
        <div>
            <h2>My Orders</h2>

            <div>
                {orders.map((order) => {
                return  <OrderCard order={order}/>
                })}
            </div>
        </div>
    )
}

export default Order