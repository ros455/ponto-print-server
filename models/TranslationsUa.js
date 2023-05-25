import mongoose from "mongoose";

const TranslationsUaSchema = new mongoose.Schema({
    key: String,
    lang: String,
    value: String

},{timestamps: true,})

export default mongoose.model('TranslationsUa',TranslationsUaSchema)