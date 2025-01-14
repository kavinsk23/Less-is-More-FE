import React, { ChangeEvent, FormEvent } from "react";
import { AlertCircle } from "lucide-react";
import LocationInput from "./SignUpFormCompo/LocationInput";
import PhoneInput from "./SignUpFormCompo/PhoneInput";
import CityInput from "./SignUpFormCompo/CityInput";

interface FormData {
  // Customer fields
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  // Seller fields
  businessName?: string;
  businessLocation?: string;
  phoneNumber?: string;
  city?: string;
  shopCategory?: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  businessName?: string;
  businessLocation?: string;
  phoneNumber?: string;
  city?: string;
  shopCategory?: string;
  general?: string;
}

interface UserSignupFormProps {
  formData: FormData;
  errors: FormErrors;
  isLoading: boolean;
  showCustomerFields?: boolean;
  showSellerFields?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const shopCategories = [
  "Restaurant",
  "Grocery Store",
  "Bakery",
  "Supermarket",
  "Convenience Store",
  "Other",
];

const UserSignupForm: React.FC<UserSignupFormProps> = ({
  formData,
  errors,
  isLoading,
  showCustomerFields = true,
  showSellerFields = true,
  onSubmit,
  onChange,
}) => {
  const handleLocationChange = (value: string) => {
    onChange({
      target: { name: "businessLocation", value },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Customer Fields */}
      {showCustomerFields && (
        <>
          <div>
            <label className="block text-small font-medium text-neutral mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              value={formData.username || ""}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.username ? "border-error" : "border-gray-300"
              }`}
              placeholder="Choose a username"
            />
            {errors.username && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.username}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-small font-medium text-neutral mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email || ""}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "border-error" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-small font-medium text-neutral mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password || ""}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.password ? "border-error" : "border-gray-300"
              }`}
              placeholder="Create a password"
            />
            {errors.password && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-small font-medium text-neutral mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword || ""}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.confirmPassword ? "border-error" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.confirmPassword}</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Seller Fields */}
      {showSellerFields && (
        <>
          <div>
            <label className="block text-small font-medium text-neutral mb-1">
              Business Name
            </label>
            <input
              name="businessName"
              type="text"
              required
              value={formData.businessName || ""}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.businessName ? "border-error" : "border-gray-300"
              }`}
              placeholder="Enter your business name"
            />
            {errors.businessName && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.businessName}</span>
              </div>
            )}
          </div>

          <LocationInput
            value={formData.businessLocation || ""}
            onChange={handleLocationChange}
            error={errors.businessLocation}
          />

          <PhoneInput
            name="phoneNumber"
            value={formData.phoneNumber || "+94"}
            onChange={onChange}
            error={errors.phoneNumber}
          />

          <CityInput
            name="city"
            value={formData.city || ""}
            onChange={onChange}
            error={errors.city}
          />

          <div>
            <label className="block text-small font-medium text-neutral mb-1">
              Shop Category
            </label>
            <select
              name="shopCategory"
              required
              value={formData.shopCategory || ""}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.shopCategory ? "border-error" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {shopCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.shopCategory && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.shopCategory}</span>
              </div>
            )}
          </div>
        </>
      )}

      {errors.general && (
        <div className="text-tiny text-error bg-error/10 p-3 rounded-md flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>{errors.general}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#006769] text-white py-2 px-4 rounded-md hover:bg-[#006769]/90 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006769]
                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                 text-body font-medium"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};

export default UserSignupForm;
