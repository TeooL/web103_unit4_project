const baseUrl = '/api/customcars'

const handleResponse = async (response) => {
    const payload = await response.json()

    if (!response.ok) {
        throw new Error(payload.error || 'Request failed.')
    }

    return payload
}

export const getAllCustomCars = async () => {
    const response = await fetch(baseUrl)
    return handleResponse(response)
}

export const getCustomCar = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`)
    return handleResponse(response)
}

export const createCustomCar = async (car) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })

    return handleResponse(response)
}

export const updateCustomCar = async (id, car) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })

    return handleResponse(response)
}

export const deleteCustomCar = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })

    return handleResponse(response)
}