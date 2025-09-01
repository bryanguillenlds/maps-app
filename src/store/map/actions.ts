import { ActionTree } from "vuex";
import { MapState } from "./state";
import { StateInterface } from "../index";

const actions: ActionTree<MapState, StateInterface> = {
  setRoute(
    { commit },
    routeData: { distance: number; duration: number; geometry: any }
  ) {
    commit("setRoute", routeData);
  },

  clearRoute({ commit }) {
    commit("clearRoute");
  },

  clearMarkers({ commit }) {
    commit("clearMarkers");
  },
};

export default actions;
