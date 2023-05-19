import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    name: String,
    password: {
        required: true,
        type: String,
    },
    isAdmin: Boolean,
    balance: Number,
    discount: Boolean,
    discountValue: Number
},{timestamps: true,})

export default mongoose.model('User',UserSchema)