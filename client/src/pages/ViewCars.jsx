import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteCustomCar, getAllCustomCars } from '../services/CustomCarsAPI.jsx'
import CarPreview from '../components/CarPreview.jsx'
import { createPreviewStyle, getCarPrice, getColorLabel, getOptionLabel, interiorOptions, packageOptions, spoilerOptions, wheelOptions } from '../utilities/carUtils.jsx'
import '../App.css'

const ViewCars = ({ title }) => {
    const navigate = useNavigate()
    const [cars, setCars] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        document.title = title || 'BOLT BUCKET | Custom Cars'

        const loadCars = async () => {
            try {
                const allCars = await getAllCustomCars()
                setCars(allCars)
            } catch (loadError) {
                setError(loadError.message)
            }
        }

        loadCars()
    }, [title])

    const handleDelete = async (id) => {
        try {
            await deleteCustomCar(id)
            setCars(cars.filter((car) => car.id !== id))
        } catch (deleteError) {
            setError(deleteError.message)
        }
    }
    
    return (
        <main className='page-shell list-page'>
            <section className='hero-copy compact'>
                <p className='eyebrow'>Saved builds</p>
                <h2>All submitted custom cars.</h2>
                <p>Edit or delete a build from this list.</p>
            </section>

            {error && <p className='form-error'>{error}</p>}

            <section className='cards-grid'>
                {cars.map((car) => (
                    <article className='car-card' key={car.id}>
                        <CarPreview style={createPreviewStyle(car)} size='small' spoiler={car.spoiler} />
                        <h3>{car.name}</h3>
                        <p>{getColorLabel(car.body_color)} body, {getOptionLabel(wheelOptions, car.wheel_style)} wheels</p>
                        <p>{getOptionLabel(interiorOptions, car.interior)} interior, {getOptionLabel(packageOptions, car.package)} package, {getOptionLabel(spoilerOptions, car.spoiler)} spoiler</p>
                        <strong>${getCarPrice(car).toLocaleString()}</strong>
                        <div className='card-actions'>
                            <button type='button' onClick={() => navigate(`/customcars/${car.id}`)}>View</button>
                            <button type='button' onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                            <button type='button' className='danger' onClick={() => handleDelete(car.id)}>Delete</button>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default ViewCars