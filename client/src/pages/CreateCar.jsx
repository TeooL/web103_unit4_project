import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCustomCar } from '../services/CustomCarsAPI.jsx'
import CarPreview from '../components/CarPreview.jsx'
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

const initialCar = {
    name: '',
    body_color: 'silver',
    wheel_style: 'standard',
    interior: 'cloth',
    package: 'city',
    spoiler: 'none'
}

const CreateCar = ({ title }) => {
    const navigate = useNavigate()
    const [car, setCar] = useState(initialCar)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title || 'BOLT BUCKET | Customize'
    }, [title])

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
            const createdCar = await createCustomCar(car)
            navigate(`/customcars/${createdCar.id}`)
        } catch (submitError) {
            setError(submitError.message)
        }
    }

    return (
        <main className='page-shell'>
            <section className='content-grid'>
                <article className='preview-panel'>
                    <CarPreview style={createPreviewStyle(car)} spoiler={car.spoiler} />
                </article>

                <article className='form-panel'>
                    {error && <p className='form-error'>{error}</p>}
                    <form onSubmit={onSubmit} className='custom-form'>
                        <label>
                            Build name
                            <input type='text' name='name' value={car.name} onChange={onChange} placeholder='Weekend cruiser' required />
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

                        <button type='submit'>Save build</button>
                    </form>
                </article>
            </section>
        </main>
    )
}

export default CreateCar