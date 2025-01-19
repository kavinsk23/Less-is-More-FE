import React from "react";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../components/LeftMenu/LeftMenu";
import CardWithTitleCompo from "../components/BuyerDashboardCompo/CardWithTitleCompo";
import ShopWithTitleCompo from "../components/BuyerDashboardCompo/ShopWithTitleCompo";

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement proper logout logic (clear tokens, etc.)
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <LeftMenu />
      <main className="flex flex-col container p-4 space-y-8">
        <CardWithTitleCompo />
        <ShopWithTitleCompo />
      </main>
    </div>
  );
};

export default BuyerDashboard;
