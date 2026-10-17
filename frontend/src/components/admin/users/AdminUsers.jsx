
import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { getAllUsers } from "../../../api/userApi"

function AdminUsers() {
    const { token } = useAuth()

    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getAllUsers(token)
                setUsers(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchUsers()
        } else {
            setLoading(false)
            setError("Please log in to view users.")
        }
    }, [token])

    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase()

        return (
            user.name?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search)
        )
    })

    if (loading) return <p>Loading users...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="admin-users">
            <div className="admin-page-header">
                <h2>Customer Management</h2>
                <p>Total users: {users.length}</p>
            </div>

            <input
                type="search"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
            />

            {filteredUsers.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Registered</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminUsers
