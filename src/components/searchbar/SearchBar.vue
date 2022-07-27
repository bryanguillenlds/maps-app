<template>
  <div class="searchbar-container">
    <input type="text" class="form-control" placeholder="Search Places..." v-model="searchTerm"/>

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
</style>