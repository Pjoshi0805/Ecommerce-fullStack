import { useState } from "react"
import useAuth from "../../hooks/useAuth"

import './Login.css'
import { useNavigate } from "react-router-dom"
function Login(){
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()
    return(
        <form onSubmit={async (e)=>{
            e.preventDefault()
            try{
                setError(null)
                await login(email,password)
                navigate('/')
            }catch(error){
                setError(error.message)
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

            {error && <p>{error}</p>}

            <button type="submit">Login</button>
        </form>
    )
}

export default Login