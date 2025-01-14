import React from "react";
import { AlertCircle } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  name,
}) => {
  const formatPhoneNumber = (input: string): string => {
    // Remove all non-digit characters except the plus sign
    const cleaned = input.replace(/[^\d+]/g, "");

    // Ensure it starts with +94
    if (!cleaned.startsWith("+94")) {
      return "+94";
    }

    // Get the numbers after +94
    const numbers = cleaned.slice(3);

    // Format the numbers with spaces
    const formatted = [];
    for (let i = 0; i < numbers.length && i < 9; i++) {
      if (i === 0) formatted.push(" "); // Space after +94
      if (i === 2) formatted.push(" "); // Space after first 2 digits
      if (i === 5) formatted.push(" "); // Space after next 3 digits
      formatted.push(numbers[i]);
    }

    return "+94" + formatted.join("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);

    // Create a new event with the formatted value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: formattedValue,
        name,
      },
    };

    onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
  };

  const formattedInitialValue = formatPhoneNumber(value);

  return (
    <div>
      <label className="block text-small font-medium text-neutral mb-1">
        Phone Number
      </label>
      <div className="relative">
        <input
          type="tel"
          name={name}
          value={formattedInitialValue}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? "border-error" : "border-gray-300"
          }`}
          placeholder="+94 7X XXX XXXX"
        />
      </div>
      {error && (
        <div className="mt-1 flex items-center text-tiny text-error">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
      <p className="mt-1 text-tiny text-neutral">Format: +94 7X XXX XXXX</p>
    </div>
  );
};

export default PhoneInput;
