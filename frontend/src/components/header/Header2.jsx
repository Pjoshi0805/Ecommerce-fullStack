import "./Header2.css";

import useCart from "../../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";

function Header2({ storeName, searchTerm, setSearchTerm }) {
    const { cartItems } = useCart()

    const navigate = useNavigate()
    const totalItems = cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">MyStore</Link>
            </div>
            <input className="search-input"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
            />
            <Link
                className="cart-btn"
                to="/cart"
            >
                Cart({totalItems})
            </Link>
        </header>
    )
}

export default Header2