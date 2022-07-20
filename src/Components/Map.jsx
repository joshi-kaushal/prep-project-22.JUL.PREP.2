import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

function DynamicMarker({ city, setCity, geoLocation, setGeoLocation }) {
  useMapEvent("click", (e) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.name);
        setCity(res.name);
        const newGeoLoc = res.coord;
        setGeoLocation({ lat: newGeoLoc.lat, lng: newGeoLoc.lon });
      });
  });
  return (
    <Marker position={[geoLocation.lat, geoLocation.lng]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}
function Map({ city, setCity, geoLocation, setGeoLocation }) {
  return (
    <section className="leaflet-container">
      <MapContainer center={geoLocation} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={geoLocation}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <DynamicMarker
          city={city}
          setCity={setCity}
          geoLocation={geoLocation}
          setGeoLocation={setGeoLocation}
        />
      </MapContainer>
    </section>
  );
}

export default Map;
