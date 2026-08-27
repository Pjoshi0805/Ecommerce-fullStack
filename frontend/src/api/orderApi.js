export async function createOrder(items,token){
    const response = await fetch('http://localhost:3001/orders',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify({
            items
        })
    })

    if(!response.ok){
        throw new Error('Failed to create order')
    }

    return response.json()
}
export async function getOrders(token){
    const response = await fetch('http://localhost:3001/orders',{
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${token}`
        },
    })
    if(!response.ok){
        throw new Error ('Failed to find order')
    }
    return response.json()
}