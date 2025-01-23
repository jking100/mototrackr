import PropTypes from "prop-types";

import { useContext } from "react";

import { LoggerContext } from "./LoggerContext";

export default function AppResults({
  onRestartRide,
  onBackToRide,
  onSubmitRide,
}) {
  const Logger = useContext(LoggerContext);

  const getMaxLeanLeft = () => {
    let maxLeanLeft = 0;
    for (let i = 0; i < Logger.GPSReadings.length; i++) {
      if (+Logger.GPSReadings[i].lean < maxLeanLeft) {
        maxLeanLeft = Logger.GPSReadings[i].lean;
      }
    }
    return Math.round(-maxLeanLeft);
  };

  const getMaxLeanRight = () => {
    let maxLeanRight = 0;
    for (let i = 0; i < Logger.GPSReadings.length; i++) {
      if (+Logger.GPSReadings[i].lean > maxLeanRight) {
        maxLeanRight = Logger.GPSReadings[i].lean;
      }
    }
    return Math.round(maxLeanRight);
  };

  return (
    <div className="flex justify-center items-center h-dvh p-2">
      <div className="card bg-base-300 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center">
            Ride Stats
          </h2>

          <div className="stats text-center portrait:stats-vertical landscape:state-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Ride Duration</div>
              <div className="stat-value">{Logger.GPSReadings.length * 5}s</div>
            </div>
            <div className="stat">
              <div className="stat-title">Max Lean Left</div>
              <div className="stat-value">{getMaxLeanLeft()}°</div>
            </div>
            <div className="stat">
              <div className="stat-title">Max Lean Right</div>
              <div className="stat-value">{getMaxLeanRight()}°</div>
            </div>
          </div>

          <div className="card-actions justify-center">
            <button
              onClick={() => {
                onBackToRide();
              }}
              className="btn btn-primary"
            >
              Back to Logging
            </button>
            <button
              onClick={() => {
                onRestartRide();
                Logger.resetGPSDataLog();
              }}
              className="btn btn-primary"
            >
              Restart
            </button>
            <button onClick={onSubmitRide} className="btn btn-secondary">
              Submit Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AppResults.propTypes = {
  onSubmitRide: PropTypes.func.isRequired,
  onRestartRide: PropTypes.func.isRequired,
  onBackToRide: PropTypes.func.isRequired,
};
