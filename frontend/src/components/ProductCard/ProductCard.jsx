
import useCart from '../../hooks/useCart'
import useWishlist from '../../hooks/useWishlist'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'
function ProductCard({ product }) {
    const { addToCart } = useCart()
    const navigate = useNavigate()
    const { wishlistItems, toggleWishlist } = useWishlist();

    const isWishlisted = wishlistItems.some(
        item => item.id === product.id
    );

    return (
        <div className="product-card" onClick={() => { navigate(`/products/${product.id}`) }}>
            <h1>{product.title}</h1>
            <h3>{product.price}</h3>
            <button onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
            }}>Add To Cart</button>
            <button
                className={`wishlist ${isWishlisted ? "wishlisted" : ""}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                    console.log("Product:", product.id, "Wishlisted:", isWishlisted);
                }}
            >
                {isWishlisted ? "♥" : "♡"}
            </button>
        </div>
    )
}

export default ProductCard