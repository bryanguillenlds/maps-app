import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useMapStore, usePlacesStore } from "@/composables";
import Mapboxgl from "mapbox-gl";
import SearchResults from "@/components/search-results/SearchResults.vue";

export default defineComponent({
  name: "SearchBar",
  components: { SearchResults },
  setup() {
    const debounceTimeout = ref();
    const debouncedValue = ref("");

    const { searchPlacesByTerm, clearPlaces } = usePlacesStore();

    const clearInput = () => {
      debouncedValue.value = "";
      clearPlaces();
    };

    return {
      debouncedValue,

      //computed val with getter and setter
      searchTerm: computed({
        get() {
          return debouncedValue.value;
        },
        set(val: string) {
          //clear timeout each time the value changes
          if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

          //then create a new timeout and update the changed value
          debounceTimeout.value = setTimeout(() => {
            debouncedValue.value = val;
            if (val.length === 0) {
              clearPlaces();
            } else {
              searchPlacesByTerm(val);
            }
          }, 500);
        },
      }),

      clearInput,
    };
  },
});
