import PropTypes from 'prop-types';

export default function AppRecord ({onEndRide}) {
    return (
        <div>
            <h2>Hello from AppRecord.jsx</h2>
            <button onClick={onEndRide}>End Ride</button>
            <button onClick={() => alert("Clicked Reset Ride")}>Reset Ride</button>
        </div>
    );
}

AppRecord.propTypes = {
    onEndRide: PropTypes.func.isRequired
};

