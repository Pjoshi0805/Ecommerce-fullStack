import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getOrderById } from "../../api/orderApi"
import useAuth from "../../hooks/useAuth"

function OrderDetails(){
   const{id} = useParams()
   const {token} = useAuth()
   const [order,setOrder] = useState(null)
   const[error,setError] = useState(null)
   const[loading,setLoading] = useState(false)

  useEffect(()=>{
     async function fetchOrder(){
        try{
           setLoading(true)
        const data = await getOrderById(id,token)
        setOrder(data)
        }catch(error){
              setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    if(token){
        fetchOrder()
    }
  },[token,id])

  if(loading){
    return <div>Loading....</div>
  }
  if(error){
    return <div>{error}</div>
  }
  if (!order) {
  return <div>No order found.</div>
}
  return(
    <div className="order-details">
      <h2>Order Details</h2>

      <div className="order-detail-header">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      </div>

      <div className="order-items">
        <h3>Items</h3>
        {order.items.map((item, index) => (
          <div className="order-item-row" key={index}>
            <p><strong>Product:</strong> {item.product}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
)
}




export default OrderDetails