import { createContext, useEffect, useReducer } from "react";
import wishlistReducer from "../reducers/wishlistReducer";
export const WishlistContext = createContext()

export function WishlistProvider({children}){
    const [wishlistItems,dispatch] = useReducer(
        wishlistReducer,
        [],
        getWishlistItems
    )

    useEffect(()=>{
        localStorage.setItem(
            'wishlist',
             JSON.stringify(wishlistItems)
        )
    },[wishlistItems])
    
function getWishlistItems(){
    const savedWishlist = localStorage.getItem('wishlist')

    if(!savedWishlist){
        return []
    }

   try{
    return JSON.parse(savedWishlist)
   }catch(error){
    return []
   }
}

    function toggleWishlist(product){
          console.log("TOGGLING:", product);
        dispatch({
            type: 'TOGGLE_WISHLIST',
            product : product
        })
    }

    return (
    <WishlistContext.Provider
        value={{
            wishlistItems,
            toggleWishlist
        }}
    >
        {children}
    </WishlistContext.Provider>
);
}