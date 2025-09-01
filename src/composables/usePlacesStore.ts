import { useStore } from "vuex";
import { StateInterface } from "@/store";
import { computed, onMounted } from "vue";

export const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters["places/isUserLocationReady"]) {
      store.dispatch("places/getInitialLocation");
    }
  });

  return {
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),
    places: computed(() => store.state.places.places),
    isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),
    selectedPlace: computed(() => store.state.places.selectedPlace),

    isUserLocationReady: computed<boolean>(
      () => store.getters["places/isUserLocationReady"]
    ),

    searchPlacesByTerm: (query = "") =>
      store.dispatch("places/searchPlacesByTerm", query),

    selectPlace: (place: any) => store.dispatch("places/selectPlace", place),
    clearPlaces: () => store.dispatch("places/clearPlaces"),
    getDirections: (destination: any) =>
      store.dispatch("places/getDirections", destination),
  };
};
