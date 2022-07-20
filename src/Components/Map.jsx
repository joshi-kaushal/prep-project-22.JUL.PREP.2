import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

function DynamicMarker({ geoLocation, setGeoLocation }) {
  console.log("DynamicMarker");
  useMapEvent("click", (e) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then((res) => {
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
function Map() {
  const [geoLocation, setGeoLocation] = useState({
    lat: 19.08333,
    lng: 72.83333,
  });

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
          geoLocation={geoLocation}
          setGeoLocation={setGeoLocation}
        />
      </MapContainer>
    </section>
  );
}

export default Map;
