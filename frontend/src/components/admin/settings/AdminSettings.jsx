import "./AdminSettings.css";

import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import {
    getCurrentUser,
    updateCurrentUser,
    changePassword
} from "../../../api/userApi"

function AdminSettings() {
    const { token } = useAuth()

    const [profile, setProfile] = useState(null)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordMessage, setPasswordMessage] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordLoading, setPasswordLoading] = useState(false)

    useEffect(() => {
        async function fetchProfile() {
            try {
                const user = await getCurrentUser(token)
                setProfile(user)
                setName(user.name)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchProfile()
        } else {
            setError("Please log in to view settings.")
            setLoading(false)
        }
    }, [token])

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        setSuccess("")

        if (!token) {
            setError("Please log in again.")
            return
        }

        if (!name.trim()) {
            setError("Name cannot be empty.")
            return
        }

        try {
            setSaving(true)

            const updatedUser = await updateCurrentUser(name, token)

            setProfile(updatedUser)
            setName(updatedUser.name)
            setSuccess("Profile updated successfully.")
        } catch (error) {
            setError(error.message)
        } finally {
            setSaving(false)
        }
    }

    async function handlePasswordChange(event) {
        event.preventDefault()
        setPasswordMessage("")
        setPasswordError("")

        if (!token) {
            setPasswordError("Please log in again.")
            return
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Please fill in all password fields.")
            return
        }

        if (newPassword.length < 8) {
            setPasswordError(
                "New password must be at least 8 characters long."
            )
            return
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.")
            return
        }

        if (currentPassword === newPassword) {
            setPasswordError(
                "Your new password must differ from your current password."
            )
            return
        }

        try {
            setPasswordLoading(true)

            const result = await changePassword(
                currentPassword,
                newPassword,
                token
            )

            setPasswordMessage(
                result.message || "Password updated successfully."
            )

            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (error) {
            setPasswordError(error.message)
        } finally {
            setPasswordLoading(false)
        }
    }

    if (loading) {
        return <p>Loading settings...</p>
    }

    if (!profile && error) {
        return <p role="alert">Error: {error}</p>
    }

    if (!profile) {
        return <p>Unable to load your profile.</p>
    }

    return (
        <div className="admin-settings">
            <h2>Admin Settings</h2>

            <section className="settings-section">
                <h3>Profile Information</h3>

                {error && <p role="alert">{error}</p>}
                {success && <p role="status">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="admin-name">Name</label>
                        <input
                            id="admin-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="admin-email">Email</label>
                        <input
                            id="admin-email"
                            type="email"
                            value={profile.email}
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="admin-role">Role</label>
                        <input
                            id="admin-role"
                            type="text"
                            value={profile.role}
                            readOnly
                        />
                    </div>

                    <button type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </section>

            <section className="settings-section">
                <h3>Change Password</h3>

                <form onSubmit={handlePasswordChange}>
                    <div>
                        <label htmlFor="currentPassword">
                            Current Password
                        </label>
                        <input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(event) =>
                                setCurrentPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(event.target.value)
                            }
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    {passwordError && (
                        <p role="alert">{passwordError}</p>
                    )}

                    {passwordMessage && (
                        <p role="status">{passwordMessage}</p>
                    )}

                    <button type="submit" disabled={passwordLoading}>
                        {passwordLoading
                            ? "Updating..."
                            : "Update Password"}
                    </button>
                </form>
            </section>
        </div>
    )
}

export default AdminSettings