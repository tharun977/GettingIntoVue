<template>
    <form @submit.prevent="fetchWeather">
      <input v-model="location" placeholder="Enter Location" required />
      <input v-model="date" type="date" required />
      <button type="submit">Get Weather</button>
    </form>
  </template>
  
  <script>
  import { ref } from "vue";
  import axios from "axios";
  
  export default {
    emits: ["weatherAdded"],
    setup(_, { emit }) {
      const location = ref("");
      const date = ref("");
  
      const fetchWeather = async () => {
        try {
          await axios.post("http://localhost:5000/api/weather", { location: location.value, date: date.value });
          emit("weatherAdded");
          location.value = "";
          date.value = "";
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      };
  
      return { location, date, fetchWeather };
    },
  };
  </script>
  
  <style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  input {
    padding: 8px;
  }
  button {
    padding: 8px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
  }
  </style>
  