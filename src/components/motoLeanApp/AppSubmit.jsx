import PropTypes from "prop-types";

import { useContext } from "react";

import { LoggerContext } from "./LoggerContext";

export default function AppSubmit({
  onHome,
  onSubmitRideToDB,
  onBackToResults,
}) {
  const Logger = useContext(LoggerContext);

  return (
    <div className="flex justify-center items-center h-dvh p-2">
      <div className="card bg-base-300 shadow-xl w-full p-2 ">
        <div className="card-title">Share Ride - UNDER DEVELOPMENT</div>
        <div className="card-body">
          <p>
            This section is currently under development. Soon you&apos;ll be
            able to view more detailed analytics of your rides, (i.e.
            visualizations of your route with lean angles) with the option to
            publically share them to this site. Check back for updates as we
            roll out these exciting features.
          </p>
        </div>
        <div className="card-actions justify-center">
          <button
            onClick={() => {
              onBackToResults();
            }}
            className="btn btn-primary"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

AppSubmit.propTypes = {
  onHome: PropTypes.func.isRequired,
  onSubmitRideToDB: PropTypes.func.isRequired,
  onBackToResults: PropTypes.func.isRequired,
};
