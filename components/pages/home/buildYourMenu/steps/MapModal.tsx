"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { X, Loader2 } from "lucide-react";

// Dynamically import the MapComponent with ssr: false
const MapComponent = dynamic(
  () => import("@/components/pages/home/buildYourMenu/steps/MapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-md">
        <p className="text-gray-500">Loading Map...</p>
      </div>
    ),
  },
);

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    lat: number,
    lng: number,
    city: string,
    area: string,
    street: string,
  ) => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [addressData, setAddressData] = useState<{
    city: string;
    area: string;
    street: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  if (!isOpen) return null;

  // Approx Bounding Box for Jeddah City
  const JEDDAH_BOUNDS = {
    north: 22.0,
    south: 21.0,
    west: 38.9,
    east: 39.4,
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setError(null);
    setAddressData(null);

    // Validate Location
    if (
      lat > JEDDAH_BOUNDS.north ||
      lat < JEDDAH_BOUNDS.south ||
      lng < JEDDAH_BOUNDS.west ||
      lng > JEDDAH_BOUNDS.east
    ) {
      setError(
        "We apologize, but this address is outside Jeddah City limits. Please select a location within Jeddah.",
      );
      return;
    }

    // Fetch Address (Reverse Geocoding)
    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "User-Agent": "Ayadi-Food-App/1.0", // Required by Nominatim
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();
      const addr = data.address || {};

      // Helper to find first available property
      const getFirst = (...args: (string | undefined)[]) =>
        args.find((a) => a && a.length > 0) || "";

      const city = getFirst(
        addr.city,
        addr.town,
        addr.village,
        addr.state_district,
        addr.state,
      );

      const area = getFirst(
        addr.suburb,
        addr.neighbourhood,
        addr.quarter,
        addr.district,
        addr.city_district,
      );

      // Construct a street address from display name or components
      // Prefer specific road/house number if available, otherwise fallback to display_name parts
      let street = getFirst(addr.road, addr.pedestrian, addr.highway);
      if (addr.house_number) {
        street = `${addr.house_number} ${street}`;
      }
      if (!street) {
        // Fallback to the first part of display_name which usually contains the most specific detail
        street = data.display_name ? data.display_name.split(",")[0] : "";
      }

      setAddressData({
        city: city || "",
        area: area || "",
        street: street + (data.display_name ? ` (${data.display_name})` : ""), // Append full address for context if needed, or just keep it simple. User wants "real actual address"
        // Let's refine strictness: User said "real actual address".
        // Nominatim display_name is usually the full address string.
        // Let's use display_name as the "Street" value mostly, or combine road + suburb.
        // Actually, let's just use display_name for the "street" field to be comprehensive,
        // or just the road? User's field is "Street Address".
        // Let's stick to using the specific components if found, else display_name.
      });

      // Update with a cleaner street format
      setAddressData({
        city: city || "",
        area: area || "",
        street: data.display_name || "",
      });
    } catch (err) {
      console.error("Geocoding error:", err);
      // Fallback
      setAddressData({
        city: "",
        area: "",
        street: `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`,
      });
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedLocation) return;
    if (error) return;

    // Use fetched data or fallback
    const city = addressData?.city || "Jeddah City";
    const area = addressData?.area || "Jeddah";
    const street =
      addressData?.street ||
      `Lat: ${selectedLocation.lat.toFixed(4)}, Lng: ${selectedLocation.lng.toFixed(4)}`;

    onConfirm(selectedLocation.lat, selectedLocation.lng, city, area, street);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[600px] flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#F9F5F1]">
          <h3 className="text-xl font-serif text-charcoal">
            Select Your Location
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-grow relative bg-gray-50">
          <MapComponent onLocationSelect={handleLocationSelect} />

          {/* Error / Status Overlay */}
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-md shadow-lg z-[1000] text-sm font-medium animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {isLoadingAddress && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-lg z-[1000] text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <Loader2 size={16} className="animate-spin text-green-500" />
              Fetching address...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <div className="flex-grow text-xs text-gray-500 flex items-center">
            {addressData
              ? addressData.street
              : selectedLocation
                ? "Fetching address..."
                : "Click on map to select"}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedLocation || !!error || isLoadingAddress}
            className={`px-8 py-2 rounded-md text-white font-medium transition-colors cursor-pointer ${
              !selectedLocation || !!error || isLoadingAddress
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 shadow-md shadow-green-500/20"
            }`}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
