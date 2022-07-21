import { useState, useEffect } from "react";

function useGetLocation(initialCity, initialLocation) {
  const [geoLocation, setGeoLocation] = useState(initialLocation);
  const [position, setPosition] = useState(initialCity);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!("geoLocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position);
          alert("Location found");
          setGeoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setPosition(position.name);
        },
        (error) => {
          setError(error.message);
        }
      );
    }
  }, [geoLocation]);

  return [geoLocation, setGeoLocation, position, setPosition];
}

export default useGetLocation;
