import PropTypes from "prop-types";

export default function AppInstructions({ onStartRide }) {
  return (
    <div className="flex justify-center h-dvh w-dvw p-2">
      <div className="card w-fit bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold justify-left mb-2">
            Before We Start
          </h1>

          <div className="flex flex-row portrait:flex-col">
            <div className="">
              <div className="card bg-base-300 p-4 m-2 max-w-72">
                <div className="badge badge-lg ">Step 1</div>
                <p className="font-bold text-md">
                  Rotate your phone to landscape mode
                </p>
              </div>
              <div className="card bg-base-300 p-4 m-2 max-w-72">
                <div className="badge badge-lg">Step 2</div>
                <p className="font-bold text-md">
                  Ensure camera is on the left side
                </p>
              </div>
            </div>
              <div className="card bg-base-300 p-4 m-2 max-w-72">
                <div className="badge badge-lg">Step 3</div>
                <p className="font-bold text-md">
                  Your phone should be now be mounted flat and sideways to the
                  bike with the screen up
                </p>
              </div>
            <div>
              <div className="alert alert-warning w-fit m-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p>Mount your phone securely to your motorcycle</p>
              </div>

              <div className="card-actions justify-center">
                <button
                  onClick={onStartRide}
                  className="btn btn-primary btn-lg"
                >
                  Start Ride
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AppInstructions.propTypes = {
  onStartRide: PropTypes.func.isRequired,
};
