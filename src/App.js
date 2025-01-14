import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import VehicleTypePage from "./pages/VehicleTypePage";
import QRScannerPage from "./pages/QRScannerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vehicle-type" element={<VehicleTypePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/scan-qr" element={<QRScannerPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
