import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import mapboxgl from "mapbox-gl";

// Debug: Check if environment variable is loaded
console.log(
  "Environment variable value:",
  process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
);
console.log("All environment variables:", process.env);

const accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

if (!accessToken) {
  console.error("Mapbox access token is not set!");
  console.error("Please check your .env file and ensure it contains:");
  console.error("VUE_APP_MAPBOX_ACCESS_TOKEN=your_token_here");
  throw new Error(
    "Mapbox access token is required. Check console for details."
  );
}

mapboxgl.accessToken = accessToken;

if (!navigator.geolocation) {
  alert("Your browser does not support Geolocation");
  throw new Error("No Geolocation :(");
}

createApp(App).use(store).use(router).mount("#app");
