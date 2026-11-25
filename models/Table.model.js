const { Schema, model } = require("mongoose");

const tableSchema = new Schema({
    number: {
        type: Number,
        unique: true,
        required: true
    },
    capacity: {
        type: Number,
        min: 1,
        required: true
    },
    active: {
        type: Boolean,
        default: true
       }
}, {
    timestamps: true
});

const Table = model("Table", tableSchema);

module.exports = Table;