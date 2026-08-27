
const initialState = []

function cartReducer(state, action) {
    if (action.type === 'ADD_TO_CART') {
        const existingItem = state.find(item => item.id === action.product.id)

        if (existingItem) {
            return (
                state.map((item) => {
                    if (item.id === existingItem.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item
                })
            )
        } else {
            return [
                ...state,
                {
                    ...action.product,
                    quantity: 1
                }
            ]
        }
    }

    if (action.type === "REMOVE_FROM_CART") {
        return state.filter(item => item.id !== action.productId);
    }

    if (action.type === "INCREASE_QUANTITY") {
        return state.map((item) => {
            if (item.id === action.productId) {
                return (
                    {
                        ...item,
                        quantity: item.quantity + 1
                    }
                )
            }
            return item
        });
    }

    if (action.type === 'DECREASE_QUANTITY') {
        const selectedProduct = state.find(item => item.id === action.productId)
        if (!selectedProduct) {
            return state;
        }
        if (selectedProduct.quantity === 1) {
            return (
                state.filter(item => item.id !== action.productId)
            )
        }

        return state.map((item) => {
            if (item.id === action.productId) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }

            return item;
        });
    }

    if(action.type === 'CLEAR_CART'){
        return []
    }
    return state
}
export {initialState}
export default cartReducer 