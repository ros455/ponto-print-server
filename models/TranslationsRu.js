import mongoose from "mongoose";

const TranslationsRuSchema = new mongoose.Schema({
    key: String,
    lang: String,
    value: String

},{timestamps: true,})

export default mongoose.model('TranslationsRu',TranslationsRuSchema)