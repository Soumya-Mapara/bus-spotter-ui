import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.divIcon({
  html: `
    <div style="
      background: linear-gradient(135deg, #3b82f6, #10b981);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: white;
      font-weight: bold;
    ">
      🚌
    </div>
  `,
  className: 'custom-bus-marker',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface BusMapProps {
  latitude: number;
  longitude: number;
  busId: string;
}

// Component to handle map centering
const MapController: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([latitude, longitude], 15);
  }, [map, latitude, longitude]);
  
  return null;
};

const BusMap: React.FC<BusMapProps> = ({ latitude, longitude, busId }) => {
  return (
    <div className="w-full h-96 relative">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-center p-2">
              <div className="text-lg font-semibold text-transport-primary">
                Bus {busId}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Current Location
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Lat: {latitude.toFixed(6)}<br />
                Lng: {longitude.toFixed(6)}
              </div>
            </div>
          </Popup>
        </Marker>
        <MapController latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  );
};

export default BusMap;