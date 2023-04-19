const { default: mongoose } = require('mongoose');
const Car = require('../models/car')

const getCarsByUser = async (req, res) => {

    console.log('gg');

    const id = req.userId;

    const { price, colour, mileage } = req.query;

    console.log(price, colour, mileage);

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({ message: "User doesn't exist" })

    }

    const query = {
        creator: id,
    }

    if (price) {
        query.price = parseInt(price);
    }

    if (colour) {
        query.colour = colour;
    }

    if (mileage) {
        query.mileage = parseInt(mileage)
    }

    console.log(query);

    try {
        const cars = await Car.find(query)

        res.status(200).json(cars)

    } catch (error) {

        res.status(404).json({ message: "getcarsbyuser error" })

    }



}


const createCar = async (req, res) => {

    const car = req.body

    const newCar = new Car({

        ...car,
        creator: req.userId,

    })

    try {

        await newCar.save()
        res.status(201).json(newCar)

    } catch (error) {
        res.status(404).json({ message: "Something wentt wrong" })
    }

}

const editCar = async (req, res) => {


    // console.log('hkhk');

    const { _id } = req.params

    const car = req.body;

    try {

        const updatedCar = { ...car, _id: _id }

        await Car.findByIdAndUpdate(_id, updatedCar, { new: true })
        res.json(updatedCar)

    } catch (error) {

        res.status(404).json({ message: "Somthing went wrong" })
    }



}

const deleteCar = async (req, res) => {

    // console.log('gg');
    const { id } = req.params
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No car exists with this id` })

        }

        await Car.findByIdAndRemove(id)

        res.json({ message: "Car deleted successfully" })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }

}



module.exports = { createCar, getCarsByUser, editCar, deleteCar }