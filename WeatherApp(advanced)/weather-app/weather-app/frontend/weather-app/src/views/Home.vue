<template>
    <WeatherForm @weatherAdded="fetchWeather" />
    <WeatherList :weatherData="weatherData" />
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import WeatherForm from "../components/WeatherForm.vue";
  import WeatherList from "../components/WeatherList.vue";
  
  export default {
    components: { WeatherForm, WeatherList },
    setup() {
      const weatherData = ref([]);
  
      const fetchWeather = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/weather");
          weatherData.value = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
  
      onMounted(fetchWeather);
  
      return { weatherData, fetchWeather };
    },
  };
  </script>
  