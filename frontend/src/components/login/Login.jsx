import { useState } from "react"
import useAuth from "../../hooks/useAuth"

import './Login.css'
function Login(){
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const {login} = useAuth()
    return(
        <form onSubmit={async (e)=>{
            e.preventDefault()
            try{
                await login(email,password)
            }catch(error){
                console.log(error.message)
            }
        }}>
            <label>Email</label>
            <input 
            type="email" 
            placeholder="Enter email..."
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />

            <label>Password</label>
            <input 
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />

            <button type="submit">Login</button>
        </form>
    )
}

export default Login