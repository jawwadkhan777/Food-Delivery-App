const { default: mongoose } = require("mongoose");


const deliverypartnersModel = new mongoose.Schema({
    name: String,
    contact: String,
    password: String,
    city: String,
    address: String,
});

export const deliverypartnersSchema = mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliverypartnersModel);