import { MutationTree } from "vuex";
import { PlacesState } from "./state";
import { Feature } from "@/interfaces/places";

const mutation: MutationTree<PlacesState> = {
  setLngLat(state: PlacesState, { lng, lat }: { lng: number; lat: number }) {
    state.userLocation = [lng, lat];
    state.isLoading = false;
  },

  setIsLoadingPlaces(state) {
    state.isLoadingPlaces = true;
  },

  setPlaces(state, places: Feature[]) {
    state.places = places;
    state.isLoadingPlaces = false;
  },

  setSelectedPlace(state, place: Feature) {
    state.selectedPlace = place;
  },

  clearPlaces(state) {
    state.places = [];
  },
};

export default mutation;
