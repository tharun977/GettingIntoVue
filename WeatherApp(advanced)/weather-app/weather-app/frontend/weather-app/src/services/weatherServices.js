import axios from 'axios';

const API_URL = 'http://localhost:5000/api/weather';

export const fetchWeather = async () => {
    return axios.get(API_URL);
};

export const saveWeather = async (data) => {
    return axios.post(API_URL, data);
};

export const validateLocation = async (location) => {
    return axios.post(`${API_URL}/validate-location`, { location });
};

export const getYoutubeVideos = async (location) => {
    return axios.get(`${API_URL}/youtube?location=${location}`);
};

export const getMapData = async (location) => {
    return axios.get(`${API_URL}/map?location=${location}`);
};
