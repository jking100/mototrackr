import PropTypes from 'prop-types';

import { useContext } from 'react';

import { LoggerContext } from './LoggerContext';

export default function AppResults ({onHome, onSubmitRide}) {
    const Logger = useContext(LoggerContext);

    const getMaxLeanLeft = () => {
        let maxLeanLeft = 0;
        for (let i = 0; i < Logger.GPSReadings.length; i++) {
            Logger.GPSReadings[i].lean < maxLeanLeft ? maxLeanLeft = Logger.GPSReadings[i].lean : null;
        }
        return Math.round(-maxLeanLeft);
    };

    const getMaxLeanRight = () => {
        let maxLeanRight = 0;
        for (let i = 0; i < Logger.GPSReadings.length; i++) {
            Logger.GPSReadings[i].lean > maxLeanRight ? maxLeanRight = Logger.GPSReadings[i].lean : null;
        }
        return Math.round(maxLeanRight);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold justify-center mb-4">Ride Stats</h2>
                    
                    <div className="stats stats-vertical shadow mb-6">
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

                    <div className="card-actions justify-center gap-4">
                        <button 
                            onClick={() => {
                                onHome();
                                Logger.resetGPSDataLog();
                            }}
                            className="btn btn-primary"
                        >
                            Restart
                        </button>
                        <button 
                            onClick={onSubmitRide}
                            className="btn btn-secondary"
                        >
                            Submit Ride
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

AppResults.propTypes = {
    onHome: PropTypes.func.isRequired,
    onSubmitRide: PropTypes.func.isRequired
};
