import PropTypes from "prop-types";
import { useContext } from "react";
import { LoggerContext } from "./LoggerContext";

export default function AppHome({ onStart, onViewResults }) {
  const Logger = useContext(LoggerContext);

  return (
    <div className="flex h-dvh items-center p-2">
      <div className="card bg-base-300 shadow-2xl">
        <div className="card-body">
          <h1 className="card-title text-4xl font-bold justify-center mb-2">
            MotoTrackr
          </h1>

          <p className="text-left">
            Welcome to MotoTrackr, your personal motorcycle performance tracker.
          </p>
          <p className="text-left">
            Record lean angles, GPS data, and other metrics during your rides to
            help improve your skills.
          </p>
          <p className="text-left">
            Tap &apos;Start Ride&apos; below to begin tracking - you&apos;ll
            need to grant motion sensor permissions for the app to work.
          </p>

          <div className="card-actions justify-center mt-6 gap-4">
            <button
              onClick={() => {
                Logger.motionAskForPerms();
                onStart();
              }}
              className="btn btn-wide btn-primary"
            >
              Start Ride
            </button>
            {/* REMOVED FROM MAIN FOR INITIAL FRONTEND RELEASE
            <button onClick={onViewResults} className="btn btn-wide btn-accent">
              View Submitted Rides
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

AppHome.propTypes = {
  onStart: PropTypes.func.isRequired,
  onViewResults: PropTypes.func.isRequired,
};
