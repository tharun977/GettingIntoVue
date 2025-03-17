const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    location: String,
    date: String,
    temperature_max: Number,
    temperature_min: Number
});

module.exports = mongoose.model("Weather", WeatherSchema);
