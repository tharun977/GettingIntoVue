<template>
    <div v-if="weatherData.length">
      <h2>Weather Records</h2>
      <ul>
        <li v-for="weather in weatherData" :key="weather._id">
          📍 <strong>{{ weather.location }}</strong> - {{ weather.date }}  
          🌡️ Max: {{ weather.temperature_max }}°C | Min: {{ weather.temperature_min }}°C  
          <button @click="deleteWeather(weather._id)">🗑️</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["weatherData"],
    setup(props, { emit }) {
      const deleteWeather = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/weather/${id}`);
          emit("weatherAdded");
        } catch (error) {
          console.error("Error deleting weather data:", error);
        }
      };
  
      return { deleteWeather };
    },
  };
  </script>
  
  <style>
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    background: #f8f9fa;
    padding: 10px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    background: red;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;
  }
  </style>
  