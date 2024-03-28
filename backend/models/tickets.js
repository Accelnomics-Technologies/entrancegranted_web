const mongoose = require("mongoose");

const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    sportName: {
      type: String,
      trim: true,
      default: null,
    },
    eventName: {
      type: String,
      trim: true,
      default: null,
    },
    homeTeam: {
      type: String,
      default: null,
      trim: true,
    },
    awayTeam: {
      type: String,
      default: null,
      trim: true,
    },
    venue: {
      type: String,
      default: null,
      trim: true,
    },
    price: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
      trim: true,
    },
    time: {
      type: String,
      default: null,
      trim: true,
    },
    imageLocation: {
      type: String,
      default: null,
    },
    gameDetails: {
      type: String,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

exports.ticketSchema = mongoose.model("tickets", ticketSchema);
