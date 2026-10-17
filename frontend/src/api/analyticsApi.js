
export async function getAdminAnalytics(token) {
    const response = await fetch("http://localhost:3001/analytics", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const text = await response.text()
    console.log("Analytics status:", response.status)
    console.log("Analytics response:", text)

    let data
    try {
        data = JSON.parse(text)
    } catch {
        throw new Error(`Server returned non-JSON response: ${text.slice(0, 150)}`)
    }

    if (!response.ok) {
        throw new Error(data.message || data.error || `Request failed: ${response.status}`)
    }

    return data
}