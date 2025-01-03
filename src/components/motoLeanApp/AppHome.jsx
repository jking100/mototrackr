import PropTypes from 'prop-types';

export default function AppHome ({onStart, onViewResults}) {
    return (
        <div>
            <h2>Hello from AppHome.jsx</h2>
            <button onClick={onStart}>Start</button>
            <button onClick={onViewResults}>View Public Rides</button>
        </div>
    );
}

AppHome.propTypes = {
    onStart: PropTypes.func.isRequired,
    onViewResults: PropTypes.func.isRequired
};
