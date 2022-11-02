import {
  CURRENT_LOCATION_UPDATED,
  SELECTED_LOCATION_UPDATED,
  LOCATION_UPDATED
} from "./Map.state";

const defaultValues = {
  // currentLocation: {},
  selectedLocation: {},
};

const MapReducers = (state = defaultValues, action) => {
  switch (action.type) {
    // case CURRENT_LOCATION_UPDATED:
    //   return {
    //     ...state,
    //     currentLocation: action.payload,
    //   };

    case LOCATION_UPDATED:
      return {
        ...state,
        selectedLocation: action.payload,
      };

    default:
      return state;
  }
};

export default MapReducers;
