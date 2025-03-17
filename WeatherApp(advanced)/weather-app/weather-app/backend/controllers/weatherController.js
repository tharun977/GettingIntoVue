const axios = require("axios");
const Weather = require("../models/weather");

exports.createWeather = async (req, res) => {
    try {
        const { location, date } = req.body;

        // Convert location to latitude/longitude
        const geoResponse = await axios.get(`https://geocode.maps.co/search?q=${location}&format=json`);
        if (!geoResponse.data.length) {
            return res.status(400).json({ message: "Invalid location" });
        }

        const { lat, lon, display_name } = geoResponse.data[0];

        // Fetch weather data from Open-Meteo
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
                latitude: lat,
                longitude: lon,
                daily: "temperature_2m_max,temperature_2m_min",
                timezone: "auto",
                start_date: date,
                end_date: date
            }
        });

        const newWeather = new Weather({
            location: display_name,
            date,
            temperature_max: weatherResponse.data.daily.temperature_2m_max[0],
            temperature_min: weatherResponse.data.daily.temperature_2m_min[0]
        });

        await newWeather.save();
        res.status(201).json(newWeather);
    } catch (err) {
        res.status(500).json({ message: "Error fetching weather data", error: err.message });
    }
};

// Get all stored weather data
exports.getWeather = async (req, res) => {
    try {
        const weatherData = await Weather.find();
        res.json(weatherData);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
};

// Update weather data
exports.updateWeather = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedWeather = await Weather.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedWeather) {
            return res.status(404).json({ message: "Weather data not found" });
        }

        res.json(updatedWeather);
    } catch (err) {
        res.status(500).json({ message: "Error updating data", error: err.message });
    }
};

// Delete weather data
exports.deleteWeather = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWeather = await Weather.findByIdAndDelete(id);

        if (!deletedWeather) {
            return res.status(404).json({ message: "Weather data not found" });
        }

        res.json({ message: "Weather data deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting data", error: err.message });
    }
};
