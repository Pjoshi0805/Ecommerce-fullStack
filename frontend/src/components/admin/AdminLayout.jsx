import { NavLink, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import './AdminLayout.css'
function AdminLayout() {
    const { logout } = useAuth()

    return (
        <div className="admin-layout">

            <aside className="admin-sidebar">

                <div className="admin-sidebar-header">
                    <h2>Admin Panel</h2>
                </div>

                <nav className="admin-navigation">

                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        📊 Dashboard
                    </NavLink>


                    <div className="nav-section">
                        <span className="nav-section-title">
                            CATALOG
                        </span>

                        <NavLink
                            to="/admin/products"
                            end
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            📦 Products
                        </NavLink>

                        <NavLink
                            to="/admin/products/create"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            ➕ Create Product
                        </NavLink>

                        <NavLink to="/admin/categories">
                            🏷️ Categories
                        </NavLink>

                        <NavLink to="/admin/inventory">
                            📋 Inventory
                        </NavLink>
                    </div>


                    <div className="nav-section">
                        <span className="nav-section-title">
                            SALES
                        </span>

                        <NavLink
                            to="/admin/orders"
                            end
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            🛒 Orders
                        </NavLink>
                    </div>


                    <div className="nav-section">
                        <span className="nav-section-title">
                            CUSTOMERS
                        </span>

                        <NavLink to="/admin/users">
                            👥 Users
                        </NavLink>
                    </div>


                    <div className="nav-section">
                        <span className="nav-section-title">
                            BUSINESS
                        </span>

                        <NavLink to="/admin/sellers">
                            🏪 Sellers
                        </NavLink>

                        <NavLink to="/admin/analytics">
                            📈 Analytics
                        </NavLink>
                    </div>


                    <div className="nav-section">
                        <span className="nav-section-title">
                            SYSTEM
                        </span>

                        <NavLink to="/admin/settings">
                            ⚙️ Settings
                        </NavLink>
                    </div>

                </nav>


                <div className="admin-sidebar-footer">
                    <button onClick={logout}>
                        🚪 Logout
                    </button>
                </div>

            </aside>


            <main className="admin-content">
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout