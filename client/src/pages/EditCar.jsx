import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCustomCar, updateCustomCar } from '../services/CustomCarsAPI.jsx'
import {
    bodyColorOptions,
    createPreviewStyle,
    getCarPrice,
    getErrorMessage,
    interiorOptions,
    packageOptions,
    spoilerOptions,
    wheelOptions
} from '../utilities/carUtils.jsx'
import '../App.css'

const EditCar = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title || 'BOLT BUCKET | Edit'

        const loadCar = async () => {
            try {
                const carDetails = await getCustomCar(id)
                setCar(carDetails)
            } catch (loadError) {
                setError(loadError.message)
            }
        }

        loadCar()
    }, [id, title])

    const onChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const validationMessage = getErrorMessage(car)

        if (validationMessage) {
            setError(validationMessage)
            return
        }

        try {
            setError('')
            await updateCustomCar(id, car)
            navigate(`/customcars/${id}`)
        } catch (submitError) {
            setError(submitError.message)
        }
    }
    
    return (
        <main className='page-shell'>
            {car && (
                <section className='content-grid'>
                    <article className='preview-panel'>
                        <div className='car-preview' style={createPreviewStyle(car)}>
                            <div className='car-roof' />
                            <div className='car-body'>
                                <div className='car-window' />
                                <div className='car-headlight car-headlight-left' />
                                <div className='car-headlight car-headlight-right' />
                                <div className='car-wheel car-wheel-left' />
                                <div className='car-wheel car-wheel-right' />
                                <div className={`car-spoiler car-spoiler-${car.spoiler}`} />
                            </div>
                        </div>
                        <div className='preview-meta'>
                            <strong>{car.name}</strong>
                            <span>${getCarPrice(car).toLocaleString()}</span>
                        </div>
                    </article>

                    <article className='form-panel'>
                        <h3>Edit build</h3>
                        {error && <p className='form-error'>{error}</p>}
                        <form onSubmit={onSubmit} className='custom-form'>
                            <label>
                                Build name
                                <input type='text' name='name' value={car.name} onChange={onChange} required />
                            </label>

                            <label>
                                Body color
                                <select name='body_color' value={car.body_color} onChange={onChange}>
                                    {bodyColorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Wheels
                                <select name='wheel_style' value={car.wheel_style} onChange={onChange}>
                                    {wheelOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label} (+${option.price.toLocaleString()})</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Interior
                                <select name='interior' value={car.interior} onChange={onChange}>
                                    {interiorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label} (+${option.price.toLocaleString()})</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Package
                                <select name='package' value={car.package} onChange={onChange}>
                                    {packageOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label} (+${option.price.toLocaleString()})</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Spoiler
                                <select name='spoiler' value={car.spoiler} onChange={onChange}>
                                    {spoilerOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label} (+${option.price.toLocaleString()})</option>
                                    ))}
                                </select>
                            </label>

                            <button type='submit'>Save changes</button>
                        </form>
                    </article>
                </section>
            )}
        </main>
    )
}

export default EditCar