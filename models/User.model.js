const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true ['Name is required.']
    },
    email: {
        type: String, 
        required: true,
        unique: true ['Email is required.']
    },
    password: {
        type: String, 
        required: true ['Password is required.']
    },
    role: {
        type: String, 
        required: true,
        enum: ["staff", "customer"],
        default: "customer"
    },
}, {
    timestamps: true
});

const User = model("User", userSchema);

module.exports = User;