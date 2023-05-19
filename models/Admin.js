import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    isAdmin: Boolean,
},{timestamps: true,})

export default mongoose.model('Admin',AdminSchema)