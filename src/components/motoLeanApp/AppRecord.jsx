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
      <GaugeDashboard onEndRide={onEndRide}/>
    </>
  );
}

AppRecord.propTypes = {
  onEndRide: PropTypes.func.isRequired,
};
