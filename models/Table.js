import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
    file: String,
    material: String,
    quality: String,
    width: Number,
    height: Number,
    count: Number,
    sum: Number,
    conditions: String,
    status: String

},{timestamps: true,})

export default mongoose.model('Table',TableSchema)