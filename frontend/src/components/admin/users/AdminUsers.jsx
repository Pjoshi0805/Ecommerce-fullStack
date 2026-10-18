import "./AdminUsers.css";

import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import {
    getAllUsers,
    updateUserStatus
} from "../../../api/userApi"

function AdminUsers() {
    const { token } = useAuth()

    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [updatingUserId, setUpdatingUserId] = useState(null)

    useEffect(() => {
        async function fetchUsers() {
            try {
                setError("")
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

    async function handleStatusChange(user) {
        const nextStatus = user.isActive === false

        setError("")
        setStatusMessage("")

        try {
            setUpdatingUserId(user._id)

            const updatedUser = await updateUserStatus(
                user._id,
                nextStatus,
                token
            )

            setUsers(currentUsers =>
                currentUsers.map(currentUser =>
                    currentUser._id === updatedUser._id
                        ? updatedUser
                        : currentUser
                )
            )

            setStatusMessage(
                `${updatedUser.name}'s account is now ${
                    updatedUser.isActive ? "active" : "inactive"
                }.`
            )
        } catch (error) {
            setError(error.message)
        } finally {
            setUpdatingUserId(null)
        }
    }

    const filteredUsers = users.filter(user => {
        const search = searchTerm.toLowerCase()

        return (
            user.name?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search)
        )
    })

    if (loading) return <p>Loading users...</p>

    if (error && users.length === 0) {
        return <p role="alert">Error: {error}</p>
    }

    return (
        <div className="admin-users">
            <div className="admin-page-header">
                <h2>Customer Management</h2>
                <p>Total users: {users.length}</p>
            </div>

            {error && <p role="alert">{error}</p>}
            {statusMessage && <p role="status">{statusMessage}</p>}

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
                            <th>Account Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map(user => {
                            const isActive = user.isActive !== false
                            const isUpdating = updatingUserId === user._id

                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {user.createdAt
                                            ? new Date(
                                                user.createdAt
                                            ).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td>
                                        {isActive ? "Active" : "Inactive"}
                                    </td>
                                    <td>
                                        {user.role === "admin" ? (
                                            "Admin account"
                                        ) : (
                                            <button
                                                type="button"
                                                disabled={isUpdating}
                                                onClick={() =>
                                                    handleStatusChange(user)
                                                }
                                            >
                                                {isUpdating
                                                    ? "Updating..."
                                                    : isActive
                                                        ? "Deactivate"
                                                        : "Activate"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminUsers