import { ActionTree } from "vuex";
import { PlacesState } from "./state";
import { StateInterface } from "../index";
import { searchApi, directionsApi } from "@/apis";
import { Feature, PlacesResponse } from "@/interfaces/places";

const actions: ActionTree<PlacesState, StateInterface> = {
  getInitialLocation({ commit }) {
    //todo: set loading
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        commit("setLngLat", { lng: coords.longitude, lat: coords.latitude }),
      (err) => {
        console.error(err);
        throw new Error("No Geolocation :(");
      }
    );
  },

  //Todo: Return value
  async searchPlacesByTerm(
    { commit, state },
    query: string
  ): Promise<Feature[]> {
    if (query.length === 0) {
      commit("setPlaces", []);
      return [];
    }

    if (!state.userLocation) {
      throw new Error("No Location for User");
    }

    commit("setIsLoadingPlaces");

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(","),
      },
    });

    commit("setPlaces", resp.data.features);

    return resp.data.features;
  },

  selectPlace({ commit }, place: Feature) {
    commit("setSelectedPlace", place);
  },

  clearPlaces({ commit, dispatch }) {
    commit("setPlaces", []);
    commit("setSelectedPlace", undefined);
    // Also clear markers and routes when clearing places
    dispatch("map/clearMarkers", {}, { root: true });
    dispatch("map/clearRoute", {}, { root: true });
  },

  async getDirections({ commit, state, dispatch }, destination: Feature) {
    if (!state.userLocation) {
      throw new Error("No Location for User");
    }

    const origin = state.userLocation.join(",");
    const dest = destination.center?.join(",");

    if (!dest) {
      throw new Error("Invalid destination coordinates");
    }

    try {
      const response = await directionsApi.get(`/${origin};${dest}`);
      const route = response.data.routes[0];

      // Dispatch to map module instead of committing directly
      dispatch(
        "map/setRoute",
        {
          distance: route.distance,
          duration: route.duration,
          geometry: route.geometry,
        },
        { root: true }
      );

      return route;
    } catch (error) {
      console.error("Error getting directions:", error);
      throw error;
    }
  },
};

export default actions;
