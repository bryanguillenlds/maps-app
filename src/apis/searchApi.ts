import axios from "axios";

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'en',
    access_token: 'pk.eyJ1IjoiYnJ5YW5zaWx2YTEwIiwiYSI6ImNsNXN6NnhuMTBhbm4zZXA3MGkyZGhibTQifQ.aJMCROSFqFiLKMgK3U6oZQ'
  }
});

export default searchApi;