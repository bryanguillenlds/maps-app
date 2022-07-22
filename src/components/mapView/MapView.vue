<template>
  <div
    v-if="!isUserLocationReady"
    class="loading-map d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <h3>Please wait</h3>
      <span>Locating...</span>
    </div>
  </div>

  <div v-show="isUserLocationReady" class="map-container" ref="mapElement"></div>
</template>

<script lang="ts" src="./MapView.ts" />

<style scoped>
.loading-map {
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}

.map-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>