import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleTypeModal from "../components/VehicleTypeModal";
import QRDisplayModal from "../components/QRDisplayModal";
import QRScannerModal from "../components/QRScannerModal";

interface QRData {
  qrString: string;
  vehicleType: string;
  timestamp: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();

  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [qrData, setQRData] = useState<QRData | null>(null);

  const handleVehicleSelect = (type: string) => {
    // Get current date in Sri Lanka time zone
    const now = new Date();
    const sriLankaTime = now.toLocaleString("en-US", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Generate a unique ID
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Format the date string
    const formattedDate = sriLankaTime
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")
      .replace(",", "")
      .replace(/\s+/g, "T");

    const qrString = `${type}_${formattedDate}_${uniqueId}`;

    setQRData({
      qrString,
      vehicleType: type,
      timestamp: formattedDate,
    });

    setShowVehicleModal(false);
    setShowQRModal(true);
  };

  const handleQRScan = (data: string) => {
    console.log("Scanned QR:", data);
    // Here you can add logic to process the scanned QR code
    // For example, calculate parking duration and fee
    try {
      const [type, timestamp, id] = data.split("_");
      // Add your processing logic here
      alert(`Scanned QR Code: ${data}`);
    } catch (error) {
      alert("Invalid QR Code");
    }
    setShowScannerModal(false);
  };

  const handleOpenReports = () => {
    navigate("/reports");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-8 text-center">
          Parking Management System
        </h1>

        {/* Main Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Issue QR Card */}
          <div
            role="button"
            onClick={() => setShowVehicleModal(true)}
            className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center justify-center h-32 sm:h-48">
              <svg
                className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <h2 className="text-base sm:text-xl font-semibold text-white">
                Issue QR
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white text-center">
                Generate QR code for vehicle entry
              </p>
            </div>
          </div>

          {/* Scan QR Card */}
          <div
            role="button"
            onClick={() => setShowScannerModal(true)}
            className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center justify-center h-32 sm:h-48">
              <svg
                className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-base sm:text-xl font-semibold text-white">
                Scan QR
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white text-center">
                Scan QR code for vehicle exit
              </p>
            </div>
          </div>

          {/* Reports Card */}
          <div
            role="button"
            onClick={handleOpenReports}
            className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center justify-center h-32 sm:h-48">
              <svg
                className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="text-base sm:text-xl font-semibold text-white">
                Reports
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white text-center">
                View parking reports and analytics
              </p>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showVehicleModal && (
          <VehicleTypeModal
            onClose={() => setShowVehicleModal(false)}
            onSelect={handleVehicleSelect}
          />
        )}

        {showQRModal && qrData && (
          <QRDisplayModal
            qrData={qrData.qrString}
            vehicleType={qrData.vehicleType}
            timestamp={qrData.timestamp}
            onClose={() => setShowQRModal(false)}
          />
        )}

        {showScannerModal && (
          <QRScannerModal
            onClose={() => setShowScannerModal(false)}
            onScan={handleQRScan}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
