import PropTypes from 'prop-types';

export default function AppSubmit ({onHome, onSubmitRideToDB}) {
    return (
        <div>
            <h2>Hello from AppSubmit.jsx</h2>
            <button onClick={onHome}>Back to Home</button>
            <button onClick={onSubmitRideToDB}>Submit Ride: Public</button>
        </div>
    );
}

AppSubmit.propTypes = {
    onHome: PropTypes.func.isRequired,
    onSubmitRideToDB: PropTypes.func.isRequired
};