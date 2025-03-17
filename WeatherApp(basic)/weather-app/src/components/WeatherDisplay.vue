<template>
    <div class="weather-box animate__animated animate__fadeInUp">
      <h2>Current Weather</h2>
      <div class="info">
        <i class="fas fa-thermometer-half"></i>
        <p>{{ weather.temperature }}°C</p>
      </div>
      <div class="info">
        <i class="fas fa-wind"></i>
        <p>{{ weather.windspeed }} km/h</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["weather"],
  };
  </script>
  
  <style scoped>
  .weather-box {
    background: rgba(255, 255, 255, 0.3);
    padding: 30px;
    border-radius: 15px;
    backdrop-filter: blur(12px);
    color: white;
    text-align: center;
    font-size: 20px;
    max-width: 500px;
    width: 100%;
    margin: 20px auto;
  }
  
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 22px;
  }
  </style>
  