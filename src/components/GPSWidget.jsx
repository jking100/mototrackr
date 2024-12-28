import { useEffect, useState } from "react";

export function GPSWidget() {
    const [isGpsAvailable, setIsGpsAvailable] = useState(false);
    const [gpsReadings, setGpsReadings] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsGpsAvailable("geolocation" in navigator);
    }, []);//runs on mount once

    const logGPSInfo = (lat, long) => {
        //i want this to insert the gps data into an array or something so i can have a table
        //render under the button the show the result of the geolocation calls
        alert(`(lat,long): (${lat}, ${long})`);
    };

    const getGPSInfo = () => {

        setError(null);

        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 20000
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const reading = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toLocaleTimeString()
                };
                setGpsReadings(prev => [...prev, reading]);
                setError(null);
            },
            (error) => {
                switch(error.code) {
                    case 1: // PERMISSION_DENIED
                        setError("Location access was denied. Please check:\n1. Safari Settings > Privacy & Security > Location Services is ON\n2. Safari Settings > Privacy & Security > Location Services > Safari Websites > Allow");
                        break;
                    case 2: // POSITION_UNAVAILABLE
                        setError("Cannot get location. Please ensure:\n1. Location Services is enabled in iOS Settings\n2. You have a clear view of the sky\n3. You're not in Airplane Mode");
                        break;
                    case 3: // TIMEOUT
                        setError("Location request timed out. Please check your internet connection and try again.");
                        break;
                    default:
                        setError(`Unknown error: ${error.message}`);
                }
            },
            options
         );
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">GPS Location</h2>
            
            {!isGpsAvailable && (
                <p className="text-red-500">GPS is not available in your browser</p>
            )}

            {isGpsAvailable && (
                <>
                    <button 
                        onClick={getGPSInfo}
                        className="font-bold py-2 px-4 rounded mb-4 bg-blue-500 hover:bg-blue-700 text-white"
                    >
                        Get GPS Reading
                    </button>

                    {error && (
                        <pre className="text-red-500 mb-4 whitespace-pre-wrap text-sm">
                            {error}
                        </pre>
                    )}

                    {gpsReadings.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="max-w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Time</th>
                                        <th className="px-4 py-2">Latitude</th>
                                        <th className="px-4 py-2">Longitude</th>
                                        <th className="px-4 py-2">Accuracy (m)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gpsReadings.map((reading, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-4 py-2">{reading.timestamp}</td>
                                            <td className="px-4 py-2">{reading.latitude.toFixed(6)}</td>
                                            <td className="px-4 py-2">{reading.longitude.toFixed(6)}</td>
                                            <td className="px-4 py-2">{reading.accuracy.toFixed(1)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}