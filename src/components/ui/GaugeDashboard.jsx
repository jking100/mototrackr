import PropTypes from "prop-types";

import { useContext, useState } from "react";
import { LoggerContext } from "@/components/motoLeanApp/LoggerContext";

import { MotorcycleLeanGauge } from "@/components/ui/MotorcycleLeanGauge";
import { Log } from "@/pages/Log";

export function GaugeDashboard({onEndRide}) {
  const Logger = useContext(LoggerContext);

  const elapsedTime = () => {
    if(Logger.GPSReadings.length > 0) {
      if(Logger.isLogging){
        const delta = Date.now() - Logger.GPSReadings[0].time;
        return (delta / 1000).toFixed(0);
      }
      const delta = Logger.GPSReadings[Logger.GPSReadings.length - 1].time - Logger.GPSReadings[0].time;
      return (delta / 1000).toFixed(0);
    }
    return 0;
  };

  const elapsedTimeStat = (
    <div className="stats h-full flex flex-col justify-center items-center">
      <div className="stat">
        <div className="stat-title">Time</div>
        <div className="stat-value text-3xl">{elapsedTime()}s</div>
      </div>
    </div>
  );

  const readingsCountStat = (
    <div className="stats h-full flex flex-col justify-center items-center">
      <div className="stat">
        <div className="stat-title">Samples</div>
        <div className="stat-value text-3xl">{Logger.GPSReadings.length}</div>
      </div>
    </div>
  );

  const maxLeftStat = (
    <div className="stats stats-vertical shadow">
      <div className="stat">
        <div className="stat-title">Max Left</div>
        <div className="stat-value">{Logger.maxLeanLeft()}°</div>
      </div>
    </div>
  );

  const maxRightStat = (
    <div className="stats stats-vertical shadow">
      <div className="stat">
        <div className="stat-title">Max Right</div>
        <div className="stat-value">{Logger.maxLeanRight()}°</div>
      </div>
    </div>
  );

  const controlButtons = (
    <div className="card h-full flex flex-col justify-center items-center gap-4 p-4">
      {!Logger.isLogging && Logger.GPSReadings.length === 0 && (
        <button
          onClick={() => Logger.startLogging()}
          className="btn btn-primary w-full h-full"
        >
          Start Logging Ride
        </button>
      )}

      {Logger.isLogging && (
        <button
          onClick={() => Logger.stopLogging()}
          className="btn btn-warning w-full h-full"
        >
          Stop Logging Ride
        </button>
      )}

      {!Logger.isLogging && Logger.GPSReadings.length > 0 && (
        <button
          onClick={() => Logger.resetGPSDataLog()}
          className="btn btn-error w-full"
        >
          Reset
        </button>
      )}

      {!Logger.isLogging && Logger.GPSReadings.length > 0 && (
        <button
          onClick={onEndRide}
          className="btn btn-info w-full"
        >
          View Ride Stats
        </button>
      )}
    </div>
  );

  return (
    <div className="card bg-base-200 h-dvh grid grid-cols-5 grid-rows-3 gap-2 p-2">
      <div className="card bg-base-300 row-span-2">{maxLeftStat}</div>
      <div className="card bg-base-300 col-span-3 row-span-2">
        <MotorcycleLeanGauge leanAngle={Logger.motionData.tilt.flatYaxis} />
      </div>
      <div className="card bg-base-300 row-span-2 col-start-5">
        {maxRightStat}
      </div>
      <div className="card bg-base-300 row-start-3">
      </div>
      <div className="card bg-base-300 col-span-3 row-start-3 flex flex-row gap-2">
        <div className="card bg-red-500 w-1/4">{elapsedTimeStat}</div>
        <div className="w-1/2">{controlButtons}</div>
        <div className="card bg-red-500 w-1/4">{readingsCountStat}</div>
      </div>
      <div className="card bg-base-300 col-start-5 row-start-3">6</div>
    </div>
  );
}

GaugeDashboard.propTypes = {
  onEndRide: PropTypes.func.isRequired,
};
