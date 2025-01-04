import PropTypes from 'prop-types';
import { useContext } from 'react';
import { LoggerContext } from './LoggerContext';

export default function AppHome({onStart, onViewResults}) {
    const Logger = useContext(LoggerContext);

    return (
        <div className="flex justify-center h-dvh items-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-4xl font-bold justify-center mb-4">MotoTrackr</h1>
                    
                    <p className="text-left">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <div className="card-actions justify-center mt-6 gap-4">
                        <button 
                            onClick={() => {
                                Logger.motionAskForPerms();
                                onStart();
                            }}
                            className="btn btn-primary"
                        >
                            Start
                        </button>
                        <button 
                            onClick={onViewResults}
                            className="btn btn-secondary"
                        >
                            View Submitted Rides
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

AppHome.propTypes = {
    onStart: PropTypes.func.isRequired,
    onViewResults: PropTypes.func.isRequired
};
