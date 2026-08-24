import { useState } from "react";
import { createContext } from "react";
import { getCurrentUser, loginUser } from "../api/userApi";
import { useEffect } from "react";

export const AuthContext =  createContext()

export function AuthProvider({children}){

    const[token,setToken] = useState(
        localStorage.getItem('token')
    )

    const[user,setUser] = useState(null)

    useEffect(() => {
    async function fetchUser() {
       try{
         const data = await getCurrentUser(token)
        setUser(data)
       }catch(error){
        console.log(error.message)
       }
    }

    if (token) {
        fetchUser()
    }
}, [token])

    async function login(email,password){
       const data = await loginUser(email,password)


       
       setToken(data.token)

       localStorage.setItem('token',data.token)

    }

    return (
        <AuthContext.Provider
        value={{
            token,
            user,
            login
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}