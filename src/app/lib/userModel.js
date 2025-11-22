// const { default: mongoose } = require("mongoose");

import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    address: String,
    contact: String
});

export const userSchema = mongoose.models.users || mongoose.model("users", userModel);