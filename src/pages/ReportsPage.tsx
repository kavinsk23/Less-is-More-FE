import React from "react";
import { useNavigate } from "react-router-dom";

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();

  // Hardcoded vehicle data
  const vehicleData = {
    lightVehicles: 123,
    heavyVehicles: 45,
  };

  // Calculate total vehicles
  const totalVehicles = vehicleData.lightVehicles + vehicleData.heavyVehicles;

  // Hardcoded earnings data
  const earningsData = {
    firstHourEarnings: 1500,
    subsequentHoursEarnings: 3200,
    totalEarnings: 4700,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-2">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-indigo-800">Reports</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-3 py-2 w-20 flex justify-center text-center ml-auto bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
          >
            Back
          </button>
        </div>

        {/* Vehicle Count */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h2 className="text-sm font-bold text-blue-800 mb-2">
            Daily Vehicle Count
          </h2>
          <table className="w-full text-xs">
            <thead className="border-b border-blue-200">
              <tr>
                <th className="text-left pb-1 text-blue-700">Vehicle Type</th>
                <th className="text-right pb-1 text-blue-700">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-100">
                <td className="py-1 text-blue-900">Light Vehicles</td>
                <td className="text-right text-blue-900">
                  {vehicleData.lightVehicles}
                </td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-1 text-blue-900">Heavy Vehicles</td>
                <td className="text-right text-blue-900">
                  {vehicleData.heavyVehicles}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-indigo-900">
                  Total Vehicles
                </td>
                <td className="text-right font-semibold text-indigo-900">
                  {totalVehicles}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Earnings */}
        <div className="bg-green-50 rounded-lg p-4">
          <h2 className="text-sm font-bold text-green-800 mb-2">Earnings</h2>
          <table className="w-full text-xs">
            <thead className="border-b border-green-200">
              <tr>
                <th className="text-left pb-1 text-green-700">Metric</th>
                <th className="text-right pb-1 text-green-700">
                  Earnings (LKR)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-green-100">
                <td className="py-1 text-green-900">First Hour</td>
                <td className="text-right text-green-900">
                  {earningsData.firstHourEarnings}
                </td>
              </tr>
              <tr className="border-b border-green-100">
                <td className="py-1 text-green-900">Subsequent Hours</td>
                <td className="text-right text-green-900">
                  {earningsData.subsequentHoursEarnings}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-purple-900">
                  Total Earnings
                </td>
                <td className="text-right font-semibold text-purple-900">
                  {earningsData.totalEarnings}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
