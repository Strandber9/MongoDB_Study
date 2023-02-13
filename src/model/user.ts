import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    age: String,
    email: String,
    nickname: String,
    gender: String,
}, {timestamps: true});

export const User = mongoose.model('user', userSchema);