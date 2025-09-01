import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    access_token: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || "",
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: true,
  },
});

export default directionsApi;
