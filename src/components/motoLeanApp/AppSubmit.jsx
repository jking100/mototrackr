import PropTypes from "prop-types";

export default function AppSubmit({ onHome, onSubmitRideToDB }) {
  return (
    <div className="flex size-full justify-center items-center">
      <div className="card portrait:w-full landscape:w-3/4 bg-base-300 m-2 max-w-3xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Submit Results</h2>
          <div className="form-container mb-4">
            <div className="min-h-[100px] bg-base-200 rounded-lg p-4">
              Form will go here
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button className="btn btn-accent" onClick={onHome}>
              Back to Home
            </button>
            <button className="btn btn-primary" onClick={onSubmitRideToDB}>
              Submit Ride: Public
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AppSubmit.propTypes = {
  onHome: PropTypes.func.isRequired,
  onSubmitRideToDB: PropTypes.func.isRequired,
};
