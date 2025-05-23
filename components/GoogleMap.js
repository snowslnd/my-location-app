import React, { use, useContext, useEffect } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { UserLocationContext } from '../context/UserLocationContext';
import Marker from './Marker';
import { SelectedBusinessContext } from '../context/SelectedBusinessContext';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LOADER_OPTIONS = {
  id: 'google-map-script',
  googleMapsApiKey: API_KEY,
};
const MapComponent = ({businessList}) => {
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  const {selectedBusiness, setSelectedBusiness} = useContext(SelectedBusinessContext);
  const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: 20,
  };
  const center = userLocation?.latitude && userLocation?.longitude
    ? {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      }
    : {
        lat: -3.745,
        lng: -38.523,
      };

   const { isLoaded } = useJsApiLoader(LOADER_OPTIONS);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    userLocation?
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
                selectedBusiness?.location
                  ? {
                      lat: selectedBusiness.location.latitude,
                      lng: selectedBusiness.location.longitude,
                    }
                  : center
              }
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
       {userLocation?.latitude && userLocation?.longitude && (
      <Marker position={center} 
        businessList={businessList} />
     )}
    </GoogleMap>:null
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
