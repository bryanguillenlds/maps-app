import axios from "axios";

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'en',
    access_token: 'pk.eyJ1IjoiYnJ5YW5zaWx2YTEwIiwiYSI6ImNtZjFpYWdsaTBrczAya3BwdHczaG1uaHUifQ.7bWNdu6rS_gMkqPzgW3n0A'
  }
});

export default searchApi;
