import React from "react";

interface VehicleTypeModalProps {
  onClose: () => void;
  onSelect: (type: string) => void;
}

const VehicleTypeModal: React.FC<VehicleTypeModalProps> = ({
  onClose,
  onSelect,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Select Vehicle Type
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Light Vehicle Card */}
          <div
            onClick={() => onSelect("LIGHT")}
            className="bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center justify-center h-32">
              <h3 className="text-xl font-semibold text-white mb-2">
                Light Vehicle
              </h3>
              <p className="text-white text-lg">20 LKR/hr</p>
            </div>
          </div>

          {/* Heavy Vehicle Card */}
          <div
            onClick={() => onSelect("HEAVY")}
            className="bg-gradient-to-r from-rose-400 to-red-500 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center justify-center h-32">
              <h3 className="text-xl font-semibold text-white mb-2">
                Heavy Vehicle
              </h3>
              <p className="text-white text-lg">50 LKR/hr</p>
            </div>
          </div>
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

export default VehicleTypeModal;
