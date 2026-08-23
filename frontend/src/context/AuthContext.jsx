import { useState } from "react";
import { createContext } from "react";
import { loginUser } from "../api/userApi";

export const AuthContext =  createContext()

export function AuthProvider({children}){

    const[token,setToken] = useState(
        localStorage.getItem('token')
    )

    async function login(email,password){
       const data = await loginUser(email,password)


       
       setToken(data.token)

       localStorage.setItem('token',data.token)

    }

    return (
        <AuthContext.Provider
        value={{
            token,
            login
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}