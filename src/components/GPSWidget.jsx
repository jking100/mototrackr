import { useEffect, useState } from "react";

export function GPSWidget() {
    const [IsGpsAvailable, setIsGpsAvailable] = useState(false);
    const checkGPSAvailable = () => {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            setIsGpsAvailable(true);
        } else {
            /* geolocation IS NOT available */
            setIsGpsAvailable(false);
        }          
    };

    const logGPSInfo = (lat, long) => {
        //i want this to insert the gps data into an array or something so i can have a table
        //render under the button the show the result of the geolocation calls
        alert(`(lat,long): (${lat}, ${long})`);
    };

    const getGPSInfo = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                logGPSInfo(position.coords.latitude, position.coords.longitude);
            },
            (fail) => {
                alert(`Failed to get GPS info: ${fail}`);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 15000,
                timeout: 10000,
            }
         );
    };

    useEffect(() => {
        checkGPSAvailable();
    }, []);

    return (
        <>
            <p>Hello from gps widget</p>
            {IsGpsAvailable && (
                <button onClick={getGPSInfo}>Get a GPS reading</button>
            )}
            {!IsGpsAvailable && (
                <p>GPS NOT AVAILABLE</p>
            )}

        </>
    );
}