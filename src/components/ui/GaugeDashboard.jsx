import PropTypes from "prop-types";

import { useContext, useState } from "react";
import { LoggerContext } from "@/components/motoLeanApp/LoggerContext";

import { MotorcycleLeanGauge } from "@/components/ui/MotorcycleLeanGauge";
import { Log } from "@/pages/Log";

export function GaugeDashboard({ onEndRide }) {
  const Logger = useContext(LoggerContext);
  const [mainPanelDisplay, setMainPanelDisplay] = useState(true);

  const elapsedTime = () => {
    if (Logger.GPSReadings.length > 0) {
      if (Logger.isLogging) {
        const delta = Date.now() - Logger.GPSReadings[0].time;
        return (delta / 1000).toFixed(0);
      }
      const delta =
        Logger.GPSReadings[Logger.GPSReadings.length - 1].time -
        Logger.GPSReadings[0].time;
      return (delta / 1000).toFixed(0);
    }
    return 0;
  };

  
  
  const elapsedTimeStat = (
    <div className="card size-full bg-base-300 items-center justify-center">
      <div className="card-title">{elapsedTime()}s</div>
    </div>
  );
  
  const maxSpeedStat = elapsedTimeStat;

  const readingsCountStat = (
    <div className="stats h-full flex flex-col justify-center items-center">
      <div className="stat">
        <div className="stat-title">Samples</div>
        <div className="stat-value text-3xl">{Logger.GPSReadings.length}</div>
      </div>
    </div>
  );

  const maxLeftStat = (
    <div className="stats m-2 stats-vertical bg-base-300 shadow">
      <div className="stat">
        <div className="stat-title">Max Left</div>
        <div className="stat-value text-center">{Logger.maxLeanLeft()}°</div>
      </div>
    </div>
  );

  const maxRightStat = (
    <div className="stats m-2 stats-vertical bg-base-300 shadow">
      <div className="stat">
        <div className="stat-title">Max Right</div>
        <div className="stat-value text-center">{Logger.maxLeanRight()}°</div>
      </div>
    </div>
  );

  //probably can delete me
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
        <button onClick={onEndRide} className="btn btn-info w-full">
          View Ride Stats
        </button>
      )}
    </div>
  );

  const mainCluster = () => {
    return (
      <div className="flex flex-row portrait:flex-col size-full items-center justify-center">
        <div className="portrait:hidden w-1/6 portrait:w-1/3 flex items-center justify-center">
          {maxLeftStat}
        </div>
        <div
          className="card bg-base-300 w-full portrait:w-full portrait:order-first flex items-center justify-center"
          onClick={() => setMainPanelDisplay(!mainPanelDisplay)}
        >
          {mainPanelDisplay && (
            <MotorcycleLeanGauge leanAngle={Logger.motionData.tilt.flatYaxis} />
          )}
          {!mainPanelDisplay && (
            <div className="card p-2 w-full h-72">
              {Logger.DiagnosticsDisplay()}
            </div>
          )}
        </div>
        <div className="portrait:hidden w-1/6 portrait:w-1/3 flex items-center justify-center">
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
    <div className="h-dvh w-dvw content-center">
      <div className="landscape:hidden card bg-warning items-center p-4 m-2">
        <div className="card-title text-center">
          Optimized for use in landscape mode
        </div>
      </div>
      <div className="flex flex-col landscape:h-dvh">
        <div className="h-4/5">{mainCluster()}</div>

        <div className="h-1/5">
          <div className="flex flex-row portrait:flex-col size-full">
            <div className="basis-1/6 p-1 flex items-center justify-center">
              {(!Logger.isLogging && Logger.GPSReadings.length > 0) && (
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
              {(!Logger.isLogging && Logger.GPSReadings.length > 0) && (
                <button onClick={onEndRide} className="btn btn-info size-full">
                  View Ride Stats
                </button>
              )}
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

/* Original grid layout implementation
return (
  <div className="card bg-base-200 h-dvh sm:h-1/2 grid grid-cols-5 grid-rows-3 gap-2 p-2">
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
*/
