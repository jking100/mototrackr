import PropTypes from "prop-types";

import { useContext, useState } from "react";

import { LoggerContext } from "./LoggerContext";

export default function AppSubmit({
  onHome,
  onSubmitRideToDB,
  onBackToResults,
}) {
  const Logger = useContext(LoggerContext);

  const [name, setName] = useState(null);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  
  function validateName (name) {
    if (name.length < 2) {
      return false;
    }


    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");

    if (validateName(name)) {
      //pass validation
      setName(name);
      setLeft(Logger.maxLeft);
      setRight(Logger.maxRight);
    } else {
      //failed validation
      return 0;
    }
  };

  return (
    <div className="flex justify-center items-center h-dvh p-2">
      <div className="card bg-base-300 shadow-xl w-full p-2 ">
        <div className="card-title text-base-content">
          Share Ride - UNDER DEVELOPMENT
        </div>
        <div className="card-body text-base-content">
          <div className="stats text-center portrait:stats-vertical landscape:state-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Ride Duration</div>
              <div className="stat-value">{Logger.GPSReadings.length * 5}s</div>
            </div>
            <div className="stat">
              <div className="stat-title">Max Lean Left</div>
              <div className="stat-value">{Logger.maxLeft}°</div>
            </div>
            <div className="stat">
              <div className="stat-title">Max Lean Right</div>
              <div className="stat-value">{Logger.maxRight}°</div>
            </div>
          </div>

          <form className="form-control" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              Name: 
              <input
                type="text"
                className="grow"
                placeholder=""
                id="name"
                name="name"
                minLength={2}
                maxLength={16}
                required
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
          <section className="bg-slate-400">
            <p>what was submitted</p>
            <p>{name}</p>
            <p>{left}</p>
            <p>{right}</p>
          </section>
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
