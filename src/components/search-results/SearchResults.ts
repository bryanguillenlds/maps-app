import { defineComponent, computed } from "vue";
import { usePlacesStore, useMapStore } from "@/composables";
import { Feature } from "@/interfaces/places";
import Mapboxgl from "mapbox-gl";

export default defineComponent({
  name: "SearchResults",
  setup() {
    const {
      places,
      isLoadingPlaces,
      selectPlace: selectPlaceAction,
      getDirections,
    } = usePlacesStore();
    const {
      map,
      isMapReady,
      distance,
      duration,
      clearRoute,
      addMarker,
      clearMarkers,
    } = useMapStore();

    const routeInfo = computed(() => {
      if (distance.value && duration.value) {
        return { distance: distance.value, duration: duration.value };
      }
      return null;
    });

    const selectPlace = (place: Feature) => {
      // Store the selected place
      selectPlaceAction(place);

      // Fly to the selected place on the map
      if (isMapReady.value && map.value && place.center) {
        // Clear previous markers and routes before adding a new one
        clearMarkers();
        clearRoute();

        map.value.flyTo({
          center: place.center as [number, number],
          zoom: 14,
        });

        // Add a marker for the selected place
        const marker = new Mapboxgl.Marker({ color: "#ff0000" })
          .setLngLat(place.center as [number, number])
          .setPopup(
            new Mapboxgl.Popup({ offset: [0, -25] }).setHTML(
              `<h4>${place.text}</h4><p>${place.place_name}</p>`
            )
          )
          .addTo(map.value);

        // Store the marker in the map store for later removal
        addMarker(marker);
      }
    };

    const getRoute = async (place: Feature) => {
      try {
        // Get directions from user's location to the selected place
        const route = await getDirections(place);

        // Show route information
        console.log(
          `Route found: ${Math.round(route.distance / 1000)}km, ${Math.round(
            route.duration / 60
          )}min`
        );

        // Now select the place (this will clear previous markers but keep the route)
        // We need to clear markers first, then add the new marker
        if (isMapReady.value && map.value && place.center) {
          // Clear previous markers but NOT the route
          clearMarkers();

          map.value.flyTo({
            center: place.center as [number, number],
            zoom: 14,
          });

          // Add a marker for the selected place
          const marker = new Mapboxgl.Marker({ color: "#ff0000" })
            .setLngLat(place.center as [number, number])
            .setPopup(
              new Mapboxgl.Popup({ offset: [0, -25] }).setHTML(
                `<h4>${place.text}</h4><p>${place.place_name}</p>`
              )
            )
            .addTo(map.value);

          // Store the marker in the map store for later removal
          addMarker(marker);
        }

        // Store the selected place in the store
        selectPlaceAction(place);
      } catch (error) {
        console.error("Error getting route:", error);
        // Fallback to just selecting the place
        selectPlace(place);
      }
    };

    const clearAll = () => {
      clearRoute();
      clearMarkers();
    };

    return {
      places,
      isLoadingPlaces,
      routeInfo,
      selectPlace,
      getRoute,
      clearRoute,
      clearAll,
    };
  },
});
