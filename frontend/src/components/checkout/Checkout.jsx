import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { createOrder } from "../../api/orderApi";
function Checkout() {
    const { cartItems ,clearCart} = useCart();
    const { token } = useAuth();
    const items = cartItems.map((item) => {
        return {
            product: item.id,
            quantity: item.quantity
        }
    })
    async function handleCheckout() {
        try {
            const order = await createOrder(items, token)
            clearCart()
            console.log(order)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <div>
                Checkout
            </div>
            <button onClick={handleCheckout}>
                Place Order
            </button>
        </>
    );
}

export default Checkout;