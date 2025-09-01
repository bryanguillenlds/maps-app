import { MutationTree } from "vuex";
import { MapState } from "./state";
import Mapboxgl from "mapbox-gl";

const mutation: MutationTree<MapState> = {
  setMap(state, map: Mapboxgl.Map) {
    state.map = map;
  },

  addMarker(state, marker: Mapboxgl.Marker) {
    state.markers.push(marker);
  },

  clearMarkers(state) {
    // Remove all markers from the map
    state.markers.forEach((marker) => marker.remove());
    state.markers = [];
  },

  setRoute(
    state,
    {
      distance,
      duration,
      geometry,
    }: { distance: number; duration: number; geometry: any }
  ) {
    state.distance = distance;
    state.duration = duration;

    // Store the route geometry for drawing on the map
    if (state.map && geometry) {
      // Remove existing route if any (layer first, then source)
      if (state.map.getLayer("route")) {
        state.map.removeLayer("route");
      }
      if (state.map.getSource("route")) {
        state.map.removeSource("route");
      }

      // Add new route source and layer
      state.map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: geometry,
        },
      });

      state.map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  },

  clearRoute(state) {
    state.distance = undefined;
    state.duration = undefined;

    if (state.map) {
      // Remove layer first, then source (Mapbox requirement)
      if (state.map.getLayer("route")) {
        state.map.removeLayer("route");
      }
      if (state.map.getSource("route")) {
        state.map.removeSource("route");
      }
    }
  },
};

export default mutation;
