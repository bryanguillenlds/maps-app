<template>
  <div class="searchbar-container">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Search Places..."
        v-model="searchTerm"
      />
      <button
        v-if="searchTerm"
        @click="clearInput"
        class="btn btn-outline-secondary"
        type="button"
      >
        ×
      </button>
    </div>

    <SearchResults />
  </div>
</template>

<script lang="ts" src="./SearchBar.ts"></script>

<style scoped>
.searchbar-container {
  width: 250px;
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 5px;
}

.input-group {
  display: flex;
}

.input-group .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
}
</style>
