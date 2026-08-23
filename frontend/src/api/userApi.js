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