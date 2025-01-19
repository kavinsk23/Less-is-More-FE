import React, { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import LocationInput from "../UserAuthCompo/SignUpFormCompo/LocationInput";

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState("Kandy");
  const [showPopup, setShowPopup] = useState(false);

  const handleLocationChange = (value: string) => {
    // Extract the city name from the full address
    const city = value.split(",")[0].trim();
    setSelectedLocation(city);
  };

  const handlePopupClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setShowPopup(false);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setShowPopup(false);
  };

  const handlePopupContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from reaching the background
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-2 cursor-pointer"
      onClick={() => setShowPopup(true)}
    >
      <MapPin className="w-5 h-5 text-primary" />
      <span className="text-small font-medium text-primary mt-1">
        {selectedLocation}
      </span>

      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
          onClick={handlePopupClose} // Close when clicking the backdrop
        >
          <div
            className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
            onClick={handlePopupContainerClick} // Prevent closure when clicking the popup content
          >
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
