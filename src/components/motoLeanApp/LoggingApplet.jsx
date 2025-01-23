import { DeviceMotionTable } from "@/components/DeviceMotionTable";
import { LeanAngleWidget } from "@/components/widgets/leanAngleWidget";
import { GPSWidget } from "@/components/GPSWidget";
import { LoggerContext } from "@/components/motoLeanApp/LoggerContext";
import { NavBar } from "@/components/ui/NavBar";

import { useState, useContext, useEffect, useRef } from "react";

export function LoggingApplet() {
  const renderCount = useRef(0);
  const [gpsCallCount, setGpsCallCount] = useState(0);
  const [lastCallTime, setLastCallTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("Never");

  // Update elapsed time every second
  useEffect(() => {
    if (!lastCallTime) {
      setElapsedTime("Never");
      return;
    }

    const updateElapsedTime = () => {
      const now = new Date();
      const elapsed = now - lastCallTime;
      const seconds = Math.floor(elapsed / 1000);
      setElapsedTime(`${seconds}s ago`);
    };

    const timer = setInterval(updateElapsedTime, 1000);
    updateElapsedTime(); // Initial update

    return () => clearInterval(timer);
  }, [lastCallTime]);

  const [showLean, setShowLean] = useState(false);
  const [showGPS, setShowGPS] = useState(false);
  const [showAccelerometer, setShowAccelerometer] = useState(false);

  const GPSData = useContext(LoggerContext);

  if (!GPSData) {
    throw new Error(
      "Error: GPSContext must be used inside a GPSContext.Provider",
    );
  }

  // First, we need state to track our interval ID
  const [intervalId, setIntervalId] = useState(null);

  // Track render count
  useEffect(() => {
    renderCount.current += 1;
  });

  // Wrap getGPSData to track stats
  const wrappedGetGPSData = () => {
    GPSData.getGPSData();
    setGpsCallCount((prev) => prev + 1);
    setLastCallTime(new Date());
  };

  // Start function
  const handleStart = () => {
    // Guard clause - prevent multiple intervals
    if (intervalId) return;

    // Store the ID so we can clear it later
    const newIntervalId = setInterval(wrappedGetGPSData, 5000);
    setIntervalId(newIntervalId);
  };

  // Stop function
  const handleStop = () => {
    // Clear the interval
    clearInterval(intervalId);
    // Reset the state
    setIntervalId(null);

    GPSData.resetGPSDataLog();
    setGpsCallCount(0);
  };

  // Component cleanup
  useEffect(() => {
    // Cleanup function runs on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    console.log("test.jsx: new GPS Reading");
    console.log(JSON.stringify(GPSData.GPSReadings));
  }, [GPSData.GPSReadings]);

  return (
    <>
      <NavBar />
      <div className="bg-slate-500 p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-3">Debug Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-200 mb-1">Page Renders</div>
            <div className="font-mono">{renderCount.current}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-200 mb-1">GPS Calls</div>
            <div className="font-mono">{gpsCallCount}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-200 mb-1">Last Call</div>
            <div className="font-mono">{elapsedTime}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="lean"
            checked={showLean}
            onChange={() => setShowLean(!showLean)}
          />
          <label htmlFor="lean">Show Lean Angle widget</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="gps"
            checked={showGPS}
            onChange={() => setShowGPS(!showGPS)}
          />
          <label htmlFor="gps">Show GPS data</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accel"
            checked={showAccelerometer}
            onChange={() => setShowAccelerometer(!showAccelerometer)}
          />
          <label htmlFor="accel">Show Accelerometer data</label>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          onClick={handleStart}
        >
          Start Logging
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={handleStop}
        >
          Stop Logging
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            DeviceOrientationEvent.requestPermission();
          }}
        >
          Request Permissions
        </button>
      </div>

      {showLean && GPSData?.motionData && (
        <LeanAngleWidget motionData={GPSData.motionData} />
      )}
      {showGPS && <GPSWidget />}
      {showAccelerometer && GPSData?.motionData && (
        <DeviceMotionTable motionData={GPSData.motionData} />
      )}

      {GPSData.GPSReadings.length > 0 && (
        <div className="card bg-blue-600 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Data Captured:</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Lean</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Accuracy (m)</th>
                  </tr>
                </thead>
                <tbody>
                  {GPSData.GPSReadings.map((reading, index) => (
                    <tr key={index}>
                      <td>{reading.timestamp}</td>
                      <td>{reading.lean}</td>
                      <td>{reading.latitude.toFixed(6)}</td>
                      <td>{reading.longitude.toFixed(6)}</td>
                      <td>{reading.accuracy.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
