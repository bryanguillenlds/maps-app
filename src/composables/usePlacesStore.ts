import {useStore} from "vuex";
import {StateInterface} from "@/store";
import {computed, onMounted} from "vue";

export const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters['places/isUserLocationReady']) {
      store.dispatch('places/getInitialLocation');
    }
  });

  return {
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),

    isUserLocationReady: computed<boolean>(() => store.getters["places/isUserLocationReady"]),

    searchPlacesByTerm: (query = '') => store.dispatch('places/searchPlacesByTerm', query)
  }
}