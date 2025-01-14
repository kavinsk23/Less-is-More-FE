import React, { useState, ChangeEvent, FormEvent } from "react";
import { AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/LoginImage.png";

// Define interfaces for type safety
interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Temporary hardcoded credentials
  const TEMP_USERNAME = "testuser";
  const TEMP_PASSWORD = "password123";

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Temporary login logic for development
      if (
        formData.username === TEMP_USERNAME &&
        formData.password === TEMP_PASSWORD
      ) {
        // Simulate successful login
        console.log("Temporary Login Successful");

        // Navigate to Buyer Dashboard
        navigate("/buyer-dashboard");
        return;
      }

      // Actual API login logic
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // TODO: Handle successful login (store token, redirect, etc.)
      console.log("Login successful:", data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Invalid credentials. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Method to quickly fill temporary credentials
  const fillTempCredentials = () => {
    setFormData({
      username: TEMP_USERNAME,
      password: TEMP_PASSWORD,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-header2 font-bold text-primary mb-2">
            Welcome Back!
          </h1>
          <p className="text-body text-neutral">
            Sign in to continue saving food
          </p>
        </div>
        <div className="w-1/2 mx-auto">
          <img src={LoginImage} alt="Description" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-small font-medium text-neutral mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.username ? "border-error" : "border-gray-300"
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.username}</span>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-small font-medium text-neutral mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-body focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.password ? "border-error" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="mt-1 flex items-center text-tiny text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Temp Credentials Button */}
          <button
            type="button"
            onClick={fillTempCredentials}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                     text-small font-medium mb-2"
          >
            Use Temp Credentials
          </button>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-small text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="text-tiny text-error bg-error/10 p-3 rounded-md flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#006769] text-white py-2 px-4 rounded-md hover:bg-[#006769]/90 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006769]
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                     text-body font-medium"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-small text-neutral">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#006769] hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
