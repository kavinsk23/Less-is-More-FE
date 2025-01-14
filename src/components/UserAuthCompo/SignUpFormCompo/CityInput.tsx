import React, { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";

interface CityInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name: string;
}

// Sri Lankan cities dataset
const sriLankanCities = [
  "Colombo",
  "Kandy",
  "Galle",
  "Jaffna",
  "Batticaloa",
  "Negombo",
  "Trincomalee",
  "Matara",
  "Anuradhapura",
  "Ratnapura",
  "Kurunegala",
  "Badulla",
  "Gampaha",
  "Kalutara",
  "Matale",
  "Nuwara Eliya",
  "Kegalle",
  "Hambantota",
  "Polonnaruwa",
  "Dambulla",
  "Ampara",
  "Kalmunai",
  "Weligama",
  "Puttalam",
  "Chilaw",
  "Panadura",
  "Moratuwa",
  "Homagama",
  "Katharagama",
  "Beruwala",
  "Ambalangoda",
  "Bandarawela",
  "Embilipitiya",
  "Hatton",
  "Wattala",
  "Horana",
  "Kaduwela",
  "Kelaniya",
  "Tangalle",
  "Vavuniya",
];

const CityInput: React.FC<CityInputProps> = ({
  value,
  onChange,
  error,
  name,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(e);

    if (input.trim()) {
      const filtered = sriLankanCities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setFocusedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const syntheticEvent = {
      target: {
        name,
        value: suggestion,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[focusedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll focused suggestion into view
  useEffect(() => {
    if (focusedIndex >= 0 && suggestionsRef.current) {
      const focusedElement = suggestionsRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [focusedIndex]);

  return (
    <div className="relative">
      <label className="block text-small font-medium text-neutral mb-1">
        City
      </label>
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value.trim() && setShowSuggestions(true)}
        className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-error" : "border-gray-300"
        }`}
        placeholder="Enter your city"
        autoComplete="off"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border rounded-md shadow-lg"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === focusedIndex ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-1 flex items-center text-tiny text-error">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default CityInput;
