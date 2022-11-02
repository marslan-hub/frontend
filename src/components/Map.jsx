import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useDispatch, useSelector } from "react-redux";
import {
  CURRENT_LOCATION_UPDATED,
  SELECTED_LOCATION_UPDATED,
  LOCATION_UPDATED
} from "./Map/Map.state";

const MapContainer = ({ google, location = [] }) => {
  console.log("location", location);
  const dispatch = useDispatch();
  const MapReducers = useSelector((res) => res);
  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: +position.coords.latitude,
      lng: +position.coords.longitude,
    };
    setCurrentPosition(currentPosition);

    dispatch({
      // type: CURRENT_LOCATION_UPDATED,
      type: LOCATION_UPDATED,
      payload: currentPosition,
    });
  };

  useEffect(() => {
    if (location.length > 0) {
      setCurrentPosition(location[0]);
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  }, []);

  const getLocations = (mapProps, map, clickEvent) => {
    setCurrentPosition({
      lat: +clickEvent.latLng.lat(),
      lng: +clickEvent.latLng.lng(),
    });

    dispatch({
      // type: SELECTED_LOCATION_UPDATED,
      type: LOCATION_UPDATED,
      payload: currentPosition,
    });
  };

  return (
    <>
      {location.length > 0 ? (
        <Map
          google={google}
          style={{
            width: "100%",
            height: "100%",
          }}
          center={currentPosition}
        >
          <Marker position={currentPosition} />
        </Map>
      ) : currentPosition && currentPosition ? (
        <Map
          google={google}
          style={{
            width: "100%",
            height: "100%",
          }}
          center={currentPosition}
          onClick={getLocations}
        >
          <Marker position={currentPosition} />
        </Map>
      ) : (
        ""
      )}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAP_API,
})(MapContainer);
