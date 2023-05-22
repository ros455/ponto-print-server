import mongoose from "mongoose";

const CalculatorSchema = new mongoose.Schema({
        name: String,
        goods: [{
            name: String,
            price: Number,
            mounting: Number,
            stamp: Number,
            stretchOnTheStretcher: Number,
            quality: [{
                name: String,
                price: Number
            }],
            eyelets: [{
                name: String,
                price: Number
            }],
            cutting: [{
                name: String,
                price: Number
            }],
            solderingOfGates: [{
                name: String,
                price: Number
            }],
            solderingPockets: [{
                name: String,
                price: Number
            }],
            lamination: [{
                name: String,
                price: Number
            }],
            color: [{
                imageColor: String,
                name: String,
                price: Number
            }],
            poster: [{
                name: String,
                price: Number
            }],
        }]
},{timestamps: true,})

export default mongoose.model('Calculator',CalculatorSchema)