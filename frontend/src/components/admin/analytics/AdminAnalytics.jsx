import { useEffect, useState } from "react"
import { getAdminAnalytics } from "../../../api/analyticsApi"
import useAuth from "../../../hooks/useAuth"

function AdminAnalytics() {
    const { token } = useAuth()
    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const data = await getAdminAnalytics(token)
                setAnalytics(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (token) fetchAnalytics()
        else {
            setError("Please log in.")
            setLoading(false)
        }
    }, [token])

    if (loading) return <p>Loading analytics...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="admin-dashboard">
            <h2>Analytics</h2>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Total Revenue</h3>
                    <p>₹{Number(analytics.totalRevenue).toLocaleString("en-IN")}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <p>{analytics.totalOrders}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Pending Orders</h3>
                    <p>{analytics.pendingOrders}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Products</h3>
                    <p>{analytics.totalProducts}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Customers</h3>
                    <p>{analytics.totalCustomers ?? 0}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminAnalytics