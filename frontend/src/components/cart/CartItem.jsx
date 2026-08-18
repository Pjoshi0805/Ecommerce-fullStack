import useCart from "../../hooks/useCart";

function CartItem({cartItem}){
const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} = useCart();

    return(
   <article className="cart-item">
            <h2 className="cart-item-title">{cartItem.title}</h2>
            <h3 className="cart-item-price">{cartItem.price.toLocaleString()}</h3>
            <div className="quantity-controls">
                 <button className="decrease" onClick={() => decreaseQuantity(cartItem.id)}>−</button>
                <span className="quantity">{cartItem.quantity}</span>
                <button className="increase" onClick={() => increaseQuantity(cartItem.id)}>+</button>
            </div>
            <p className="cart-item-subtotal">Subtotal: {(cartItem.quantity*cartItem.price).toLocaleString()}</p>
            <button className="remove" onClick={()=>removeFromCart(cartItem.id)}>Remove</button>
        </article>
 )
}

export default CartItem