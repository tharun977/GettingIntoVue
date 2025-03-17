<template>
  <div :class="weatherBackground" class="app-container">
    <div class="overlay">
      <div class="content">
        <h1 class="title animate__animated animate__fadeInDown">Weather App 🌤️</h1>
        <SearchBar @search="getWeather" />
        <WeatherDisplay v-if="weatherData" :weather="weatherData" />
        <Forecast v-if="forecastData" :forecast="forecastData" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar.vue";
import WeatherDisplay from "./components/WeatherDisplay.vue";
import Forecast from "./components/Forecast.vue";

export default {
  components: { SearchBar, WeatherDisplay, Forecast },
  data() {
    return {
      weatherData: null,
      forecastData: null,
    };
  },
  computed: {
    weatherBackground() {
      if (!this.weatherData) return "default-bg";
      let code = this.weatherData.weathercode;
      if (code < 3) return "clear-bg";
      if (code < 45) return "cloudy-bg";
      return "rain-bg";
    },
  },
  methods: {
    async getWeather(location) {
      try {
        let [lat, lon] = await this.getCoordinates(location);
        let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

        let response = await fetch(weatherUrl);
        let data = await response.json();

        this.weatherData = data.current_weather;
        this.forecastData = data.daily;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async getCoordinates(location) {
      let geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;
      let response = await fetch(geoUrl);
      let data = await response.json();
      if (data.length > 0) {
        return [data[0].lat, data[0].lon];
      } else {
        throw new Error("Location not found");
      }
    },
  },
};
</script>

<style>
@import "animate.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: "Poppins", sans-serif;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 🔥 Background Styles */
.default-bg {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.clear-bg {
  background: url("images/clear.jpg") no-repeat center/cover;
}

.cloudy-bg {
  background: url("images/cloudy.jpg") no-repeat center/cover;
}

.rain-bg {
  background: url("images/rain.jpg") no-repeat center/cover;
}

/* 🔹 Overlay Effect */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 🔹 Center Content */
.content {
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
}

.title {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
