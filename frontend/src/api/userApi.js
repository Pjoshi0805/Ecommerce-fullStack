export async function loginUser(email,password){
    const response = await fetch('http://localhost:3001/users/login',{
        method: 'POST',
       headers : {
        'Content-Type' : 'application/json'
       },
       body : JSON.stringify({
        email,
        password
       })
    })

    if(!response.ok){
        throw new Error ('Invalid login crendentials') 
    }

    return response.json()
}

export async function registerUser(name,email,password){
    const response = await fetch('http://localhost:3001/users',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name,
            email,
            password
        })
    })

    if(!response.ok){
        throw new Error('Failed to create account')
    }

    return response.json()

}

export async function getCurrentUser(token){
    const response = await fetch('http://localhost:3001/users/me',{
        method : 'GET',
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error('User not found')
    }

    return response.json()
}



export async function getAllUsers(token) {
    const response = await fetch('http://localhost:3001/users/admin/users', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        console.error("Get users failed:", response.status, data)
        throw new Error(data.message || data.error || `Request failed: ${response.status}`)
    }

    return data
}


export async function updateCurrentUser(name, token) {
    const response = await fetch('http://localhost:3001/users/me', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
    }

    return data
}


export async function changePassword(currentPassword, newPassword, token) {
    const response = await fetch('http://localhost:3001/users/me/password', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            currentPassword,
            newPassword
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to change password')
    }

    return data
}