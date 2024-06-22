import mongoose from "mongoose";

// creating a user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username already exists"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

// if model is found, then give that model, else create a new model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;