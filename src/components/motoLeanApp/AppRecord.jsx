import PropTypes from "prop-types";

import { useContext, useState, useEffect } from "react";

import { LoggerContext } from "./LoggerContext";

import { LeanAngleWidget } from "@/components/widgets/leanAngleWidget";
import { GaugeDashboard } from "@/components/ui/GaugeDashboard";

export default function AppRecord({ onEndRide }) {
  /*
    const LoggerContextValues = {
        // GPS data
        GPSReadings,
        error,
        isGPSAvailable,
        getGPSData,
        resetGPSDataLog,
        // Motion data
        motionData,
        isMotionAvailable,
        motionPermissionStatus,
        motionErrorBox
        //diagnostics
        DiagnosticsDisplay
    };
    */
  const Logger = useContext(LoggerContext);

  return (
    <>
      <GaugeDashboard />
      <div className="p-4">
        <LeanAngleWidget motionData={Logger.motionData} />

        <div className="card w-full bg-zinc-500 shadow-xl">
          <p>Readings: {Logger.GPSReadings.length}</p>
          <p>Elapsed Time: {Logger.GPSReadings.length * 5}s</p>
        </div>
        <br />
        <div className="space-x-4 mb-4">
          {!Logger.isLogging && Logger.GPSReadings.length === 0 && (
            <button
              onClick={() => Logger.startLogging()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start Logging Ride
            </button>
          )}

          {Logger.isLogging && (
            <button
              onClick={() => Logger.stopLogging()}
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              Stop Logging Ride
            </button>
          )}

          {!Logger.isLogging && Logger.GPSReadings.length > 0 && (
            <button
              onClick={() => Logger.resetGPSDataLog()}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          )}

          {!Logger.isLogging && Logger.GPSReadings.length > 0 && (
            <button
              onClick={onEndRide}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Ride Stats
            </button>
          )}
        </div>

        {Logger.DiagnosticsDisplay()}
      </div>
    </>
  );
}

AppRecord.propTypes = {
  onEndRide: PropTypes.func.isRequired,
};
