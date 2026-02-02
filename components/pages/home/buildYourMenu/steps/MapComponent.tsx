"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

// Fix for default marker icon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapComponentProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const LocationMarker = ({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  // Config: Center on Jeddah, Saudi Arabia
  const defaultCenter = { lat: 21.5433, lng: 39.1728 };
  const defaultZoom = 12;

  // Bounds for Jeddah (approximate)
  const jeddahBounds: L.LatLngBoundsExpression = [
    [21.0, 38.9], // South West
    [22.0, 39.4], // North East
  ];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      maxBounds={jeddahBounds}
      maxBoundsViscosity={1.0}
      minZoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default MapComponent;
