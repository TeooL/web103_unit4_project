import express from 'express'
import {
    createCar,
    deleteCar,
    getCar,
    getCars,
    updateCar
} from '../controllers/customitems.js'

const router = express.Router()

router.get('/', getCars)
router.get('/:id', getCar)
router.post('/', createCar)
router.put('/:id', updateCar)
router.delete('/:id', deleteCar)

export default router