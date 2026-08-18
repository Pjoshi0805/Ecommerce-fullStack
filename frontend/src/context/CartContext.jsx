import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";
import cartReducer, {initialState} from "../reducers/cartReducer";
import products from "../data/products";
export const CartContext = createContext();  //create a space for cart

export function CartProvider({children}){
  const [cartItems,dispatch] = useReducer(
                                cartReducer,
                              initialState,
                               getCartItems
                            )

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

 function getCartItems() {
    const savedCart = localStorage.getItem("cart");

    if (savedCart === null) {
        return [];
    }

    try {
        return JSON.parse(savedCart);
    } catch (error) {
        return [];
    }
}

  const addToCart = useCallback((product) => {
    dispatch({
        type: "ADD_TO_CART",
        product
    });
}, []);

  const increaseQuantity = useCallback((id)=>{
        dispatch({
            type: 'INCREASE_QUANTITY',
            productId:id
        })
  },[])

  const decreaseQuantity = useCallback((id)=>{
        dispatch({
            type: 'DECREASE_QUANTITY',
            productId : id
        })
  },[])

  const removeFromCart = useCallback((id)=>{
    dispatch({
        type:'REMOVE_FROM_CART',
        productId : id
    })
  },[])
  

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
}), [
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
]);
  return (
     <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}