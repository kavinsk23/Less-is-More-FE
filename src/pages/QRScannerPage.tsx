import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const QRScannerPage = () => {
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleClose = () => {
    navigate(-1);
  };

  const handleScan = (data: string) => {
    console.log("Scanned QR:", data);
    try {
      const [type, timestamp, id] = data.split("_");
      // Add your processing logic here
      alert(`Scanned QR Code: ${data}`);
    } catch (error) {
      alert("Invalid QR Code");
    }
    navigate(-1);
  };

  useEffect(() => {
    // Initialize scanner only once
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");

      // Start scanning
      scannerRef.current
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (scannerRef.current) {
              scannerRef.current.stop().then(() => {
                handleScan(decodedText);
              });
            }
          },
          undefined
        )
        .catch((err) => {
          console.error("Scanner error:", err);
        });
    }

    // Cleanup
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <button
            onClick={handleClose}
            className="text-sm px-3 py-2 w-20 flex justify-center text-center ml-auto bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
          >
            Back
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-center">
            Scan QR Code
          </h1>
        </div>

        {/* Scanner */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <div className="relative">
            <div
              id="reader"
              className="w-full rounded-lg overflow-hidden"
              style={{ minHeight: "300px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScannerPage;
