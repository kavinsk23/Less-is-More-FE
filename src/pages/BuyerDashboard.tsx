import React from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../components/BuyerDashboardCompo/LocationSelector";
import LeftMenu from "../components/LeftMenu/LeftMenu";
import ItemCard from "../components/BuyerDashboardCompo/CardWithTitleCompo/ItemCard";
import ShopPage from "../components/BuyerDashboardCompo/CardWithTitleCompo";

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement proper logout logic (clear tokens, etc.)
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-row h-10">
      <LeftMenu />

      <main className="flex flex-row container p-4">
        <ShopPage />
      </main>
    </div>
  );
};

export default BuyerDashboard;
