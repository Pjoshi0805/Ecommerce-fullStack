import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import './AdminLayout.css'
import useAuth from "../../hooks/useAuth"
function AdminLayout() {
    const { logout } = useAuth()
    return (
        <div className="admin-layout">
            <aside>
                <h2>Admin Panel</h2>
                <NavLink
                    to="/admin"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Products
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Orders
                </NavLink>

                <button onClick={logout}>
                    Logout
                </button>
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout