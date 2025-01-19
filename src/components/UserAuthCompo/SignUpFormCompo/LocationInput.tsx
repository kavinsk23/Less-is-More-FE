import React, { useState } from "react";
import { AlertCircle, MapPin, Loader2 } from "lucide-react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const LocationInput = ({ value, onChange, error }: LocationInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const formatCityName = (address: any): string => {
    // Try to get the most specific location name in order of preference
    const cityName =
      address.city ||
      address.town ||
      address.village ||
      address.suburb ||
      address.neighbourhood ||
      "Unknown";

    // Truncate to 8 characters and trim any partial words
    if (cityName.length > 8) {
      return cityName.substring(0, 8).replace(/\s\w+$/, "");
    }
    return cityName;
  };

  const detectLocation = async () => {
    setIsLoading(true);
    setLocationError("");

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` +
          `format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&countrycodes=lk`,
        {
          headers: {
            "Accept-Language": "en",
          },
        }
      );

      const data = await response.json();
      const cityName = formatCityName(data.address);
      onChange(cityName);
    } catch (error) {
      console.error("Location error:", error);
      setLocationError("Please enable location access and try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-small font-medium text-neutral mb-1">
        Business Location
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            // Truncate input value to 8 characters
            const truncated = e.target.value.substring(0, 8);
            onChange(truncated);
          }}
          maxLength={8}
          className={`w-full px-4 py-2 pr-24 border rounded-md text-body 
                     focus:outline-none focus:ring-2 focus:ring-primary 
                     ${
                       error || locationError
                         ? "border-error"
                         : "border-gray-300"
                     }`}
          placeholder="City name"
        />
        <button
          type="button"
          onClick={detectLocation}
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 
                   text-tiny text-primary hover:bg-primary/10 rounded-md
                   flex items-center gap-1 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
          {isLoading ? "Detecting..." : "Detect"}
        </button>
      </div>
      {(error || locationError) && (
        <div className="mt-1 flex items-center text-tiny text-error">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error || locationError}</span>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
