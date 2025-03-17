<template>
    <div class="forecast-box animate__animated animate__fadeInUp">
      <h2>5-Day Forecast</h2>
      <div class="grid">
        <div v-for="(day, index) in forecast.time.slice(0, 5)" :key="index">
          <p>{{ day }}</p>
          <i class="fas fa-cloud-sun"></i>
          <p>Max: {{ forecast.temperature_2m_max[index] }}°C</p>
          <p>Min: {{ forecast.temperature_2m_min[index] }}°C</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["forecast"],
  };
  </script>
  
  <style scoped>
  .forecast-box {
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    color: white;
  }
  
  .grid {
    display: flex;
    justify-content: space-around;
  }
  </style>
  