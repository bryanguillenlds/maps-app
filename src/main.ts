import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJ5YW5zaWx2YTEwIiwiYSI6ImNtZjFpYWdsaTBrczAya3BwdHczaG1uaHUifQ.7bWNdu6rS_gMkqPzgW3n0A";

if (!navigator.geolocation) {
  alert("Your browser does not support Geolocation");
  throw new Error("Your browser does not support Geolocation");
}

createApp(App).use(store).use(router).mount("#app");
