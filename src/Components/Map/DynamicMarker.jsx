import { useState } from "react";
import { Marker, Popup, useMapEvent } from "react-leaflet";

function DynamicMarker({ city, setCity, geoLocation, setGeoLocation }) {
  const [markerPos, setMarkerPos] = useState(city);
  useMapEvent("click", async (e) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_APIKEY}`;

    const response = await fetch(URL);
    const data = await response.json();

    setCity(data.name);
    setMarkerPos(data.name);

    const newGeoLoc = data.coord;
    setGeoLocation({ lat: newGeoLoc.lat, lng: newGeoLoc.lon });
  });

  return (
    <Marker position={[geoLocation.lat, geoLocation.lng]}>
      <Popup>You are in {markerPos}</Popup>
    </Marker>
  );
}

export default DynamicMarker;
