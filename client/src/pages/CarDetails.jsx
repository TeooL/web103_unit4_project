import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCustomCar, getCustomCar } from '../services/CustomCarsAPI.jsx'
import { createPreviewStyle, getCarPrice, getColorLabel, getOptionLabel, interiorOptions, packageOptions, spoilerOptions, wheelOptions } from '../utilities/carUtils.jsx'
import '../App.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title || 'BOLT BUCKET | View'

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

    const handleDelete = async () => {
        try {
            await deleteCustomCar(id)
            navigate('/customcars')
        } catch (deleteError) {
            setError(deleteError.message)
        }
    }

    return (
        <main className='page-shell detail-page'>
            {error && <p className='form-error'>{error}</p>}
            {car && (
                <section className='detail-layout'>
                    <article className='preview-panel'>
                        <div className='car-preview detail' style={createPreviewStyle(car)}>
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
                    </article>

                    <article className='form-panel'>
                        <p className='eyebrow'>Build #{car.id}</p>
                        <h2>{car.name}</h2>
                        <p>Body color: {getColorLabel(car.body_color)}</p>
                        <p>Wheels: {getOptionLabel(wheelOptions, car.wheel_style)}</p>
                        <p>Interior: {getOptionLabel(interiorOptions, car.interior)}</p>
                        <p>Package: {getOptionLabel(packageOptions, car.package)}</p>
                        <p>Spoiler: {getOptionLabel(spoilerOptions, car.spoiler)}</p>
                        <p className='price-chip'>${getCarPrice(car).toLocaleString()}</p>
                        <div className='card-actions'>
                            <button type='button' onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                            <button type='button' className='danger' onClick={handleDelete}>Delete</button>
                        </div>
                    </article>
                </section>
            )}
        </main>
    )
}

export default CarDetails