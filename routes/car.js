const express = require('express')
const router = express.Router()

const { createCar, getCarsByUser, editCar, deleteCar } = require('../controllers/car');


router.post('/createcar', createCar)

router.get('/cars', getCarsByUser);

router.patch('/edit/:_id', editCar)

router.delete('/delete/:id', deleteCar)

module.exports = router;