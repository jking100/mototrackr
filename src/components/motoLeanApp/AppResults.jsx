import PropTypes from 'prop-types';

export default function AppResults ({onHome, onSubmitRide}) {
    return (
        <div>
            <h2>Hello from AppResults.jsx</h2>
            <button onClick={onHome}>Restart</button>
            <button onClick={onSubmitRide}>Submit Ride</button>
        </div>
    );
}

AppResults.propTypes = {
    onHome: PropTypes.func.isRequired,
    onSubmitRide: PropTypes.func.isRequired
};