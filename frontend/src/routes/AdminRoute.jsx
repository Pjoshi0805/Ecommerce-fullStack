import { Navigate ,Outlet} from "react-router-dom"
import useAuth from "../hooks/useAuth"

function AdminRoute(){
   const {user,authLoading} = useAuth()
  if(authLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(!user){
        return <Navigate to='/login'/>
    }

    if(user.role !== 'admin'){
       return <Navigate to='/'/>
    }

    return <Outlet/>

}

export default AdminRoute