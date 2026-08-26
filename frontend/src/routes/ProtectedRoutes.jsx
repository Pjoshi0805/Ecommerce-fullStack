import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";

export function ProtectedRoute(){
    const {user,authLoading} = useAuth()
    if(authLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    if(!user){
        return(
            <Navigate to='/login'/>
        )
    }

    return <Outlet/>
}