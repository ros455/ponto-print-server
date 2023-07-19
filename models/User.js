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
    address: String,
    disabled: {
        type:Boolean,
        default: false,
    },
    loggedIn: {
        type:Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        require: true,
    },
    balance: Number,
    balanceHistory: [{
        historyValue: String,
        date: String,
        action: String
    }],
    discount: Boolean,
    discountValue: Number,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
    }]
}, { timestamps: true });

export default mongoose.model('User',UserSchema)