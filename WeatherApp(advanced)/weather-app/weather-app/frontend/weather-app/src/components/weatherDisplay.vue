<template>
    <div class="weather-container">
      <h1>Weather Info</h1>
      <ul>
        <li v-for="weather in weatherData" :key="weather._id">
          <p>Location: {{ weather.location }}</p>
          <p>Temperature: {{ weather.temperature }}°C</p>
          <p>Description: {{ weather.description }}</p>
        </li>
      </ul>
  
      <h2>Map</h2>
      <iframe v-if="mapData" :src="mapDataUrl" width="600" height="450"></iframe>
  
      <h2>YouTube Videos</h2>
      <ul>
        <li v-for="video in youtubeVideos" :key="video.id.videoId">
          <a :href="'https://www.youtube.com/watch?v=' + video.id.videoId" target="_blank">
            {{ video.snippet.title }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { fetchWeather, getYoutubeVideos, getMapData } from '../services/weatherService';
  
  const weatherData = ref([]);
  const youtubeVideos = ref([]);
  const mapData = ref(null);
  
  onMounted(async () => {
      const response = await fetchWeather();
      weatherData.value = response.data;
  
      const location = weatherData.value[0]?.location;
      if (location) {
          const youtubeResponse = await getYoutubeVideos(location);
          youtubeVideos.value = youtubeResponse.data;
  
          const mapResponse = await getMapData(location);
          mapData.value = mapResponse.data;
      }
  });
  </script>
  