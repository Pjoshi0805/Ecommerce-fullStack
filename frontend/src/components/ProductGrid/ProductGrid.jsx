import ProductCard from "../ProductCard/ProductCard"
import './ProductGrid.css'
import useProducts from "../../hooks/useProducts"
function ProductGrid({loading,error,products,searchTerm,selectedCategory,sortOption}){
  if(loading){
        return (
            <div className="loading-wrapper">
             <div className="loading"></div>
              </div>
        )
    }else if(error){
        return(
            <div>
                Error....
            </div>
        )
    }
  const visibleProducts = useProducts(
    products,
    searchTerm,
    selectedCategory,
    sortOption
)

  if(visibleProducts.length===0){
    return(
        <p>
            No products found.
Try changing your search or filters.
        </p>
    )
  }

    return(   
        <div className="product-grid">
        {visibleProducts.map((product)=>{
       return <ProductCard
        key={product.id}
        product={product}
        />
    }) }
        </div>
    )
}

export default ProductGrid