import { GPSContext } from "./GPSContext";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export function GPSProvider({children}) {
    const [isGPSAvailable, setIsGPSAvailable] = useState(false);
    const [GPSReadings, setGPSReadings] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setIsGPSAvailable("geolocation" in navigator);
    }, []);//runs on mount once
    
    const getGPSData = () => {
            const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        };
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const reading = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toLocaleTimeString()
                };
                setGPSReadings(prev => [...prev, reading]);
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
        
    const resetGPSDataLog = () => {
        setGPSReadings([]);
        setError([]);
    };
        
    const GPSContextValues = {
        GPSReadings,
        error,
        isGPSAvailable,
        getGPSData,
        resetGPSDataLog
    };

    return (
        <div className="outline">
            <GPSContext.Provider value={GPSContextValues}>
                {children}    
            </GPSContext.Provider>      
        </div>
    );
};

GPSProvider.propTypes = {
    //children can be any valid react node
    children : PropTypes.node.isRequired
};
