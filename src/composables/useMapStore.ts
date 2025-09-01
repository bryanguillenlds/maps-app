import { useStore } from "vuex";
import { computed } from "vue";
import { StateInterface } from "@/store";
import Mapboxgl from "mapbox-gl";

export const useMapStore = () => {
  const store = useStore<StateInterface>();

  return {
    map: computed(() => store.state.map.map),
    distance: computed(() => store.state.map.distance),
    duration: computed(() => store.state.map.duration),

    isMapReady: computed<boolean>(() => store.getters["map/isMapReady"]),

    setMap: (map: Mapboxgl.Map) => store.commit("map/setMap", map),
    setRoute: (routeData: any) => store.dispatch("map/setRoute", routeData),
    clearRoute: () => store.dispatch("map/clearRoute"),
    clearMarkers: () => store.dispatch("map/clearMarkers"),
    addMarker: (marker: Mapboxgl.Marker) =>
      store.commit("map/addMarker", marker),
  };
};
