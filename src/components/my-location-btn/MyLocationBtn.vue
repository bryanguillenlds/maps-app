<template>
  <button v-if="isBtnReady" class="btn btn-primary" @click="onMyLocationClick">
    Got To Location
  </button>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useMapStore, usePlacesStore} from "@/composables";

export default defineComponent({
  name: 'MyLocationBtn',
  setup() {
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { map, isMapReady } = useMapStore();

    return {
      isBtnReady: computed(() => isUserLocationReady.value && isMapReady.value ),

      onMyLocationClick: () => {
        map.value.flyTo({
          center: userLocation.value,
          zoom: 14
        })
      }
    }
  }
})
</script>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>