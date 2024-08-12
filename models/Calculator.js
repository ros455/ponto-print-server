import mongoose from "mongoose";

const CalculatorSchema = new mongoose.Schema({
        nameUa: String,
        nameRu: String,
        goods: [{
            nameUa: String,
            nameRu: String,
            price: Number,
            prices: {
                small: Number,
                average: Number,
                many: Number,
            },
            mounting: Number,
            stamp: Number,
            stretchOnTheStretcher: Number,
            stretchOnTheStretcherMin: Number,
            quality: [{
                nameUa: String,
                nameRu: String,
                price: Number
            }],
            eyelets: [{
                nameUa: String,
                nameRu: String,
                price: Number
            }],
            cutting: [{
                nameUa: String,
                nameRu: String,
                price: Number
            }],
            solderingOfGates: [{
                nameUa: String,
                nameRu: String,
                price: Number
            }],
            solderingPockets: [{
                nameUa: String,
                nameRu: String,
                price: Number
            }],
            lamination: [{
                nameUa: String,
                nameRu: String,
                price: Number,
                prices: {
                    small: Number,
                    average: Number,
                    many: Number,
                },
            }],
            color: [{
                imageColor: String,
                nameUa: String,
                nameRu: String,
                price: Number
            }],
            poster: [{
                nameUa: String,
                nameRu: String,
                price: Number
            }],
        }]
},{timestamps: true,})

export default mongoose.model('Calculator',CalculatorSchema)