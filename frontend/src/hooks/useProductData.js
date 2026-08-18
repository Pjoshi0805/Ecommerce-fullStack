import { useEffect,useState } from "react"

function useProductData(){
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
          async function fetchProducts(){
           try{
             const response = await  fetch("https://fakestoreapi.com/products")
          if(!response.ok){
             throw new Error('404 Not Found')
          }
          const data = await response.json()
          setProducts(data)
           }catch(err){
            setError(err.message)
           }finally{
            setLoading(false)
           }
          }
            fetchProducts()
    },[])

    return{
        products,
        loading,
        error
    }
}

export default useProductData