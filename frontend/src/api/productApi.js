export async function getProducts() {
    const response = await fetch('http://localhost:3001/products')
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    const data = await response.json()

    return data.map((product) => {
        return {
            ...product,
            id: product._id
        }
    })
}