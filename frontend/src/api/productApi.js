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
export async function getProductById(id) {
    const response = await fetch(`http://localhost:3001/products/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch product')
    }

    return response.json()
}
export async function createProduct(product, token) {
    const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })

    if (!response.ok) {
        throw new Error('Failed to create product')
    }

    return response.json()
}
export async function updateProduct(id, product, token) {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })

    if (!response.ok) {
        throw new Error('Failed to update product')
    }

    return response.json()
}

export async function deleteProduct(id,token) {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error('Failed to delete product')
    }

    return response.json()
}