import { useState } from 'react';

const useTrackLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [latLong, setLatLong] = useState('');

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMessage('');
  };

  const error = () => {
    setLocationErrorMsg('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMessage('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMessage,
  };
};

export default useTrackLocation;
