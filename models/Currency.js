import mongoose from "mongoose";

const CurrencySchema = new mongoose.Schema({
    currency: Number,
    banckCurrency: Number,
    value: Number

},{timestamps: true,})

export default mongoose.model('Currency',CurrencySchema)