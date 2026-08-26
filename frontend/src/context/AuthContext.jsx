import { useState } from "react";
import { createContext } from "react";
import { getCurrentUser, loginUser } from "../api/userApi";
import { useEffect } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem('token')
    )

    const [user, setUser] = useState(null)

    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getCurrentUser(token)
                setUser(data)
            } catch (error) {
                console.log(error.message)
            }finally{
                setAuthLoading(false)
            }
        }

        if (token) {
            fetchUser()
        }else{
            setAuthLoading(false)
        }
    }, [token])

    async function login(email, password) {
        const data = await loginUser(email, password)
        setToken(data.token)
        localStorage.setItem('token', data.token)
    }

    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }
    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                authLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}