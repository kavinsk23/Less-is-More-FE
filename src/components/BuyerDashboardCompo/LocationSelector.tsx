import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import LocationInput from "../UserAuthCompo/SignUpFormCompo/LocationInput";

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState("Kandy");
  const [showPopup, setShowPopup] = useState(false);

  const handleLocationChange = (value: string) => {
    // Extract the city name from the full address
    const city = value.split(",")[0].trim();
    setSelectedLocation(city);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleApply = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex items-center">
      <MapPin className="w-5 h-5 mr-2 text-primary" />
      <div className="mr-2">Location:</div>
      <button
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setShowPopup(true)}
      >
        <a href="#" className="hover:no-underline text-primary/80 text-small">
          {selectedLocation}
        </a>
        <ChevronDown className="w-5 h-5 text-primary ml-2" />
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <LocationInput
              value={selectedLocation}
              onChange={handleLocationChange}
            />
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                         text-small font-medium"
                onClick={handlePopupClose}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                         text-small font-medium"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
