import useWishlist from "../../hooks/useWishlist"
import ProductCard from "../ProductCard/ProductCard"


function Wishlist() {
    const { wishlistItems } = useWishlist()

    return (
        <div className="wishlist-page">
            {wishlistItems.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}

export default Wishlist