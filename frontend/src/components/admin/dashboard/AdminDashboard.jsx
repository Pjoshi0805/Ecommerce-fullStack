
import { useEffect, useState } from "react"
import { getAdminAnalytics } from "../../../api/analyticsApi"
import useAuth from "../../../hooks/useAuth"
import "./AdminDashboard.css"

function AdminDashboard() {
    const { token } = useAuth()

    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true)
            setError(null)

            try {
                const data = await getAdminAnalytics(token)
                setAnalytics(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchDashboardData()
        } else {
            setLoading(false)
            setError("Please log in to view the dashboard.")
        }
    }, [token])

    if (loading) {
        return <div>Loading dashboard...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Total Products</h3>
                    <p>{analytics.totalProducts}</p>
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
                    <h3>Total Revenue</h3>
                    <p>
                        {Number(analytics.totalRevenue).toLocaleString(
                            "en-IN",
                            { style: "currency", currency: "INR" }
                        )}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Customers</h3>
                    <p>{analytics.totalCustomers}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard