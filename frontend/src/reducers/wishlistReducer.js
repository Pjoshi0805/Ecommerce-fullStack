const initialState =  []

function wishlistReducer(state,action){

    if (action.type === "TOGGLE_WISHLIST") {
    const existingItem = state.find(item=> action.product.id === item.id)

   if(existingItem){
    return state.filter((item)=>{
       return item.id!==action.product.id
    })
   }

   return [
    ...state,
    action.product
   ]
}
return state
}


export default wishlistReducer