import React from 'react'
import '../App.css'

const CarPreview = ({ style, size = 'default', spoiler = 'none' }) => {
    return (
        <div className={`car-preview ${size}`} style={style} aria-hidden='true'>
            <div className='car-roof' />
            <div className='car-body'>
                <div className='car-window' />
                <div className='car-headlight car-headlight-left' />
                <div className='car-headlight car-headlight-right' />
                <div className='car-wheel car-wheel-left' />
                <div className='car-wheel car-wheel-right' />
                <div className={`car-spoiler car-spoiler-${spoiler}`} />
            </div>
        </div>
    )
}

export default CarPreview