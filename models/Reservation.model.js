const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number, 
    required: true,
    min: 1
  },
  status: {
    type: String, 
    required: true, 
    enum: ["confirmed", "cancelled"],
    default: "confirmed"
  }}, {
    timestamps: true
});

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
