import mongoose from "mongoose";

const CalculatorSchema = new mongoose.Schema({
        name: String,
        eyeletsSizePrice: Number,
        stretchOnTheStretcher: Number,
        eyelets: [{
            name: String,
            price: Number
        }],
        goods: [{
            name: String,
            price: Number,
            mounting: Number,
            stamp: Number,
            quality: [{
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