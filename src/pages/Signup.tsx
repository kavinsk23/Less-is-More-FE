import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSignupForm from "../components/UserAuthCompo/UserSignupForm";

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"customer" | "seller">("customer");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/auth/signup/${userType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      navigate("/login", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Registration failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-header2 font-bold text-primary mb-2">
            Create Account
          </h1>
          <p className="text-body text-neutral">
            Join our community in reducing food waste
          </p>
        </div>

        <div className="flex rounded-md mb-6">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${
              userType === "customer"
                ? "bg-[#006769] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setUserType("customer")}
          >
            Customer
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${
              userType === "seller"
                ? "bg-[#006769] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setUserType("seller")}
          >
            Seller
          </button>
        </div>

        <UserSignupForm
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          showCustomerFields={userType === "customer"}
          showSellerFields={userType === "seller"}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />

        <p className="mt-6 text-center text-small text-neutral">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#006769] hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
