<template>
  <div class="search-results-container">
    <ul class="list-group mt-3" v-if="places.length > 0">
      <li
        v-for="place in places"
        :key="place.id"
        class="list-group-item list-group-item-action"
        @click="selectPlace(place)"
      >
        <h5>{{ place.text }}</h5>
        <p>{{ place.place_name }}</p>
        <div align="right">
          <button
            class="btn btn-outline-primary btn-sm"
            @click.stop="getRoute(place)"
          >
            Route
          </button>
        </div>
      </li>
    </ul>

    <div v-else-if="isLoadingPlaces" class="text-center mt-3">
      <p>Searching...</p>
    </div>

    <div v-else class="text-center mt-3">
      <p>No search results yet</p>
    </div>

    <!-- Route Information Display -->
    <div
      v-if="routeInfo"
      class="route-info mt-3 p-3 bg-info text-white rounded"
    >
      <h6>Route Information</h6>
      <p class="mb-1">
        Distance: {{ Math.round(routeInfo.distance / 1000) }} km
      </p>
      <p class="mb-0">
        Duration: {{ Math.round(routeInfo.duration / 60) }} min
      </p>
      <div class="mt-2">
        <button @click="clearRoute" class="btn btn-sm btn-outline-light me-2">
          Clear Route
        </button>
        <button @click="clearAll" class="btn btn-sm btn-outline-light">
          Clear All
        </button>
      </div>
    </div>

    <!-- Clear All Button (when there are places or route info) -->
    <div v-if="places.length > 0 || routeInfo" class="mt-3">
      <button @click="clearAll" class="btn btn-outline-secondary btn-sm w-100">
        Clear All (Search + Pins + Route)
      </button>
    </div>
  </div>
</template>

<script src="./SearchResults.ts"></script>

<style scoped>
.search-results-container {
  position: relative;
}

li {
  cursor: pointer;
}

h5 {
  font-size: 15px !important;
}

p {
  font-size: 10px !important;
}

.route-info {
  font-size: 12px;
}
</style>
