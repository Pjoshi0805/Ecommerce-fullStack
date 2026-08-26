import { useState } from "react"
import { registerUser } from "../../api/userApi"
import { useNavigate } from "react-router-dom"


function Register(){
     const[email,setEmail] = useState('')
     const[password,setPassword] = useState('')
     const[name,setName]=useState('')
     const[error,setError] = useState(null)
     const navigate = useNavigate()
     
     return(
        <form onSubmit={async (e)=>{
          e.preventDefault()
          setError(null)
          try{
            await registerUser(name,email,password)
            navigate('/login')
          }catch(error){
            setError(error.message)
          }

        }}>
            <label>Name</label>
            <input
             type="text"
             placeholder="Enter your name"
             value={name}
             onChange={(e)=>{
                setName(e.target.value)
             }}
             />
             <label>Email</label>
             <input
             type="email"
             placeholder="Enter your email"
             value={email}
             onChange={(e)=>{
                setEmail(e.target.value)
             }}
             />
             <label>Password</label>
             <input
             type="password"
             placeholder="Enter your password"
             value={password}
             onChange={(e)=>{
                setPassword(e.target.value)
             }}
             />

             <button type="submit">Register</button>
        </form>
     )
    }



export default Register