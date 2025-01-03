import  PropTypes  from 'prop-types';

export default function AppInstructions ({onStartRide}) {
    return (
        <div>
            <h2>Hello from AppInstructions.jsx</h2>
            <button onClick={onStartRide}>Start Ride</button>
        </div>
    );
}

AppInstructions.propTypes = {
    onStartRide: PropTypes.func.isRequired
};
