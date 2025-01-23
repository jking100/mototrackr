import { useEffect, useState } from "react";
import { useContext } from "react";
import { GPSContext } from "./features/geolocation/GPSContext";

export function GPSWidget() {
  const GPSData = useContext(GPSContext);

  if (!GPSData) {
    throw new Error("Error: GPSWidget must be used inside a GPSProvider");
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">GPS Location</h2>

      {1 && (
        <>
          <button
            onClick={GPSData.getGPSData}
            className="font-bold py-2 px-4 rounded mb-4 bg-blue-500 hover:bg-blue-700 text-white"
          >
            Get GPS Reading
          </button>

          {GPSData.error && (
            <pre className="text-red-500 mb-4 whitespace-pre-wrap text-sm">
              {GPSData.error}
            </pre>
          )}

          {GPSData.GPSReadings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="max-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Latitude</th>
                    <th className="px-4 py-2">Longitude</th>
                    <th className="px-4 py-2">Accuracy (m)</th>
                  </tr>
                </thead>
                <tbody>
                  {GPSData.GPSReadings.map((reading, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{reading.timestamp}</td>
                      <td className="px-4 py-2">
                        {reading.latitude.toFixed(6)}
                      </td>
                      <td className="px-4 py-2">
                        {reading.longitude.toFixed(6)}
                      </td>
                      <td className="px-4 py-2">
                        {reading.accuracy.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
