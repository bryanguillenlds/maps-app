import { Feature } from "@/interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]; //lng and lat
  isLoadingPlaces: boolean;
  places: Feature[];
  selectedPlace?: Feature;
}

function state(): PlacesState {
  return {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
    selectedPlace: undefined,
  };
}

export default state;
