import React from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../components/BuyerDashboardCompo/LocationSelector";

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement proper logout logic (clear tokens, etc.)
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <LocationSelector />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center">
        <p className="text-small text-neutral">
          © {new Date().getFullYear()} Food Waste Reduction Platform
        </p>
      </footer>
    </div>
  );
};

export default BuyerDashboard;
