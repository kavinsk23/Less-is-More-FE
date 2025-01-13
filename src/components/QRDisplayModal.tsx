import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRDisplayModalProps {
  qrData: string;
  vehicleType: string;
  timestamp: string;
  onClose: () => void;
}

const QRDisplayModal: React.FC<QRDisplayModalProps> = ({
  qrData,
  vehicleType,
  timestamp,
  onClose,
}) => {
  const formattedTime = new Date(timestamp).toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const rate = vehicleType === "HEAVY" ? "50 LKR/hr" : "20 LKR/hr";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Entry Ticket</h2>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={qrData} size={200} level="H" includeMargin={true} />
        </div>

        {/* Ticket Details */}
        <div className="space-y-2 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Vehicle Type</p>
            <p className="font-semibold">
              {vehicleType === "HEAVY" ? "Heavy Vehicle" : "Light Vehicle"}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Rate</p>
            <p className="font-semibold">{rate}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Entry Time</p>
            <p className="font-semibold">{formattedTime}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">QR Code</p>
            <p className="font-mono text-sm break-all">{qrData}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => window.print()}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Print Ticket
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-50 text-gray-800 py-2 rounded-lg hover:bg-gray-100 border border-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRDisplayModal;
