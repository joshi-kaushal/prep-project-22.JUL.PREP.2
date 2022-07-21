import { MapContainer, TileLayer } from "react-leaflet";
import DynamicMarker from "./DynamicMarker";

function Map({ city, setCity, geoLocation, setGeoLocation }) {
  return (
    <section className="leaflet-container">
      <MapContainer center={geoLocation} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
