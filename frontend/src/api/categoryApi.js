export async function getCategories() {
    const response = await fetch(
        'http://localhost:3001/categories'
    )

    if (!response.ok) {
        throw new Error('Failed to fetch categories')
    }

    return response.json()
}

export async function createCategory(category, token) {
    const response = await fetch(
        'http://localhost:3001/categories',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(category)
        }
    )

    if (!response.ok) {
        throw new Error('Failed to create category')
    }

    return response.json()
}


export async function updateCategory(id, updates, token) {
    const response = await fetch(
        `http://localhost:3001/categories/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        }
    )

    if (!response.ok) {
        throw new Error('Failed to update category')
    }

    return response.json()
}


export async function deleteCategory(id, token) {
    const response = await fetch(
        `http://localhost:3001/categories/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (!response.ok) {
        throw new Error('Failed to delete category')
    }

    return response.json()
}