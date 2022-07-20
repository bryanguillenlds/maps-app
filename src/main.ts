import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ5YW5zaWx2YTEwIiwiYSI6ImNsNXN6NnhuMTBhbm4zZXA3MGkyZGhibTQifQ.aJMCROSFqFiLKMgK3U6oZQ';

if (!navigator.geolocation) {
  alert('Your browser does not support Geolocation');
  throw new Error('Your browser does not support Geolocation');
}

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
