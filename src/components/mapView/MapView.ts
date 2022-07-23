import {defineComponent, onMounted, ref, watch} from "vue";
import {useMapStore, usePlacesStore} from "@/composables";
import Mapboxgl from "mapbox-gl";

export default defineComponent({
  name: 'MapView',
  setup() {
    const {setMap} = useMapStore();
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error('Div Element Container does not exist');
      if (!userLocation.value) throw new Error('User Location does not exist');

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup({ offset: [0, -25]})
        .setLngLat(userLocation.value)
        .setHTML(`
          <h4>I am Here</h4>
          <p>Currently in Orem</p>
        `)

      const myLocationMarker = new Mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      //todo: set map in vuex
      setMap(map);
    }

    onMounted(() => {
      if (isUserLocationReady.value) return initMap();
    });

    watch(isUserLocationReady, (newVal) => {
      if (isUserLocationReady.value) initMap();
    })

    return {
      isUserLocationReady,
      mapElement
    }
  }
})