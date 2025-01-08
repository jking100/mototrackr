import PropTypes from "prop-types";

import { useContext, useRef, useState } from "react";
import { LoggerContext } from "@/components/motoLeanApp/LoggerContext";

import { MotorcycleLeanGauge } from "@/components/ui/MotorcycleLeanGauge";

export function GaugeDashboard({ onEndRide }) {
  const Logger = useContext(LoggerContext);
  const [mainPanelDisplay, setMainPanelDisplay] = useState(true);

  const prevTime = useRef(0);

  const elapsedTime = () => {
    if (Logger.GPSReadings.length > 0) {

      if (Logger.isLogging) {
        const delta = Date.now() - Logger.GPSReadings[0].time;
        prevTime.current = (delta / 1000).toFixed(0);
        return prevTime.current;
      }
      return prevTime.current;
    }
    return 0;
  };

  const elapsedTimeStat = (
    <div className="card size-full bg-base-300 items-center justify-center">
      <div className="card-title">{elapsedTime()}s</div>
    </div>
  );

  const maxSpeedStat = elapsedTimeStat;

  const maxLeftStat = (
    <div className="stats w-fit stats-vertical bg-base-300 shadow">
      <div className="stat">
        <div className="stat-title">Max Left</div>
        <div className="stat-value text-center">{Logger.maxLeanLeft()}°</div>
      </div>
    </div>
  );

  const maxRightStat = (
    <div className="stats w-full stats-vertical bg-base-300 shadow">
      <div className="stat">
        <div className="stat-title">Max Right</div>
        <div className="stat-value text-center">{Logger.maxLeanRight()}°</div>
      </div>
    </div>
  );

  const mainCluster = () => {
    return (
      <div className="h-full flex flex-row portrait:flex-col items-center justify-center gap-2">
        <div className="card p-2 bg-base-content/20 portrait:hidden w-1/6 h-full portrait:w-1/3 flex items-center justify-center">
          {maxLeftStat}
        </div>
        <div
          className="card size-full bg-base-300 portrait:w-full portrait:order-first flex justify-center"
          onClick={() => setMainPanelDisplay(!mainPanelDisplay)}
        >
          {mainPanelDisplay && (
            <MotorcycleLeanGauge
              leanAngle={Logger.motionData.tilt.flatYaxisSmooth}
            />
          )}
          {!mainPanelDisplay && (
            <div className="card p-2 overflow-auto">
              {Logger.DiagnosticsDisplay()}
            </div>
          )}
        </div>
        <div className="card p-2 bg-base-content/20 portrait:hidden w-1/6 h-full portrait:w-1/3 flex items-center justify-center">
          {maxRightStat}
        </div>
        <div className="landscape:hidden flex flex-row size-full justify-around">
          <div className="card bg-base-300 w-1/6 portrait:w-1/3 flex items-center justify-center">
            {maxLeftStat}
          </div>
          <div className="card bg-base-300 w-1/6 portrait:w-1/3 flex items-center justify-center">
            {maxRightStat}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-dvh w-dvw content-center p-2">
      <div className="card size-full justify-center bg-base-200">
        <div className="landscape:hidden card bg-warning items-center p-2 mb-2">
          <div className="card-title text-center text-warning-content">
            Optimized for use in landscape mode
          </div>
        </div>
        <div className="flex flex-col size-full">
          <div className="h-4/5">{mainCluster()}</div>
          <div className="h-1/5">
            <div className="flex flex-row portrait:flex-col size-full">
              <div className="basis-1/6 p-1 flex items-center justify-center">
                {!Logger.isLogging && Logger.GPSReadings.length > 0 && (
                  <button
                    onClick={() => Logger.resetGPSDataLog()}
                    className="btn btn-error size-full"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="basis-1/6 p-1 flex items-center justify-center">
                {maxSpeedStat}
              </div>
              <div className="basis-1/3 p-1 flex items-center justify-center">
                {!Logger.isLogging && Logger.GPSReadings.length === 0 && (
                  <button
                    onClick={() => Logger.startLogging()}
                    className="btn btn-primary size-full"
                  >
                    Start Logging Ride
                  </button>
                )}

                {Logger.isLogging && (
                  <button
                    onClick={() => Logger.stopLogging()}
                    className="btn btn-warning size-full"
                  >
                    Stop Logging Ride
                  </button>
                )}
              </div>
              <div className="basis-1/6 p-1 flex items-center justify-center">
                {elapsedTimeStat}
              </div>
              <div className="basis-1/6 p-1 flex items-center justify-center">
                {!Logger.isLogging && Logger.GPSReadings.length > 0 && (
                  <button
                    onClick={onEndRide}
                    className="btn btn-info size-full"
                  >
                    View Ride Stats
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

GaugeDashboard.propTypes = {
  onEndRide: PropTypes.func.isRequired,
};
