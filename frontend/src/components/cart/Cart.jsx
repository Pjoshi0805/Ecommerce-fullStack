import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";
import './Cart.css'
import {useNavigate } from "react-router-dom";
function Cart() {
    console.log('cart component rendereed')
    const { cartItems } = useCart();
     const navigate = useNavigate()

    const totalItems = cartItems.reduce((acc, curr) => {
        return acc + curr.quantity
    }, 0)

    const totalPrice = cartItems.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity)
    }, 0)

    if (cartItems.length === 0) {
        return (
            <section className="cart">
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button onClick={()=>{navigate('/')}}>
                        ×
                    </button>
                </div>

                <p>Your cart is empty.</p>
            </section>
        )
    }

    return (
        <section className="cart">
            <div className="cart-header">
                <h2>Your Cart</h2>
                <button onClick={()=>{navigate('/')}}>
                    ← Continue Shopping
                </button>
            </div>
            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map((cartItem) => {
                        return (
                            <CartItem
                                key={cartItem.id}
                                cartItem={cartItem}
                            />
                        )
                    })}
                </div>
                <div className="cart-summary">
                    <p>
                        Items: {totalItems}
                    </p>
                    <h3>
                        Total: ₹{totalPrice.toLocaleString()}
                    </h3>
                    <button 
                    onClick={()=>{
                        navigate('/checkout')
                    }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Cart