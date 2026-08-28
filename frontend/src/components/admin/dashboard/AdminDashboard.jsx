import { Link } from "react-router-dom"

function AdminDashboard(){
return (
    <div>
        <h1>Admin Dashboard</h1>
        <Link to="/admin/products">Products</Link>
    </div>
)
}

export default AdminDashboard