import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    access_token:
      "pk.eyJ1IjoiYnJ5YW5zaWx2YTEwIiwiYSI6ImNtZjFpYWdsaTBrczAya3BwdHczaG1uaHUifQ.7bWNdu6rS_gMkqPzgW3n0A",
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: true,
  },
});

export default directionsApi;
