const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({

    carName: {
        type: String,
        required: [true, 'Please provide carname']
    },
    image: {
        type: String,
        //  required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    mileage: {
        type: Number,
        required: true,
    },
    creator: {
        type: String,
        // required: true,
    },
    colour: {
        type: String
    }

})

const Car = mongoose.model("Car", carSchema)

module.exports = Car;