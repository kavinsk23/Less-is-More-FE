import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerModalProps {
  onClose: () => void;
  onScan: (data: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ onClose, onScan }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

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
                onScan(decodedText);
                onClose();
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
  }, [onScan, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Scan QR Code</h2>

        <div className="relative">
          <div
            id="reader"
            className="w-full rounded-lg overflow-hidden"
            style={{ minHeight: "300px" }}
          ></div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-50 text-gray-800 py-2 rounded-lg hover:bg-gray-100 border border-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default QRScannerModal;
