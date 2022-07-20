import {useStore} from "vuex";
import {StateInterface} from "@/store";
import {onMounted} from "vue";

export const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters['places/isUserLocationReady']) {
      store.dispatch('places/getInitialLocation');
    }
  });

  return {

  }
}