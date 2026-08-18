import { useNavigate, useParams , useOutletContext } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import './ProductDetails.css'
import useCart from "../../hooks/useCart"
function ProductDetails() {
    const { id } = useParams()
    const productId = Number(id)
    const {products,loading,error} = useOutletContext()
    const selectedProduct = products.find((product) => product.id === productId)
    const { addToCart } = useCart()
    const navigate = useNavigate()
    if (!selectedProduct) {
        return (
            <div>
                Product does not exist....
            </div>
        )
    }
    return (
        <main className="product-container">
            <button className="back-to-products" onClick={() => { navigate('/') }}>
                Back To Products
            </button>
            <div className="product-details">
                <div className="product-image">
                    <span>  <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                    /></span>
                </div>
                <section className="product-information">
                    <p className="product-category">
                        {selectedProduct.category}
                    </p>
                    <h1 className="product-title">
                        {selectedProduct.title}
                    </h1>
                    <p className="product-price">
                        ₹{selectedProduct.price}
                    </p>
                </section>
            </div>
            <div className="product-actions">
                <button onClick={() => {
                    addToCart(selectedProduct)
                }}>
                    Add To Cart
                </button>
                <button onClick={() => {
                    addToCart(selectedProduct)
                    navigate('/cart')
                }}
                >Buy Now
                </button>
            </div>

        </main>
    )
}

export default ProductDetails