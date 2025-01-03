import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { LoggerContext } from "./LoggerContext";
import { useDeviceMotion } from "@/components/features/deviceMotion/useDeviceMotion";

export function LoggerProvider({children}) {
    const [isGPSAvailable, setIsGPSAvailable] = useState(false);
    const [GPSReadings, setGPSReadings] = useState([]);
    const [LeanReadings, setLeanReadings] = useState([]);
    const [error, setError] = useState(null);

    const {
        motionData, 
        isAvailable: isMotionAvailable, 
        permissionStatus: motionPermissionStatus, 
        errorBox: motionErrorBox, 
        askForPerms: motionAskForPerms
    } = useDeviceMotion(5);

    useEffect(() => {
        setIsGPSAvailable("geolocation" in navigator);
    }, []);//runs on mount once

    //add current lean to latest gps reading as the gps readings list expands
    useEffect(() => {
        if (GPSReadings.length > 0) {
            const latestIndex = GPSReadings.length - 1;
            const latestReading = GPSReadings[latestIndex];
            
            // Only update if we haven't added lean data yet
            if (!latestReading.lean) {
                const updatedReadings = [...GPSReadings];
                updatedReadings[latestIndex] = {
                    ...latestReading,
                    lean: motionData.tilt.flatYaxis.toFixed(1)
                };
                setGPSReadings(updatedReadings);
                //alert(JSON.stringify(updatedReadings));
            }
        }
    }, [GPSReadings, motionData.tilt.flatYaxis]);
    
    const getGPSData = () => {
        
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        };
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const reading = {
                    time: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                setGPSReadings(prev => [...prev, reading]);
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

    const DiagnosticsDisplay = () => {
        return (
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Diagnostic Info</h2>
                
                {/* Motion Status Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Motion Status</h3>
                    <div className="space-y-2 text-base">
                        <p>Available: {isMotionAvailable ? '✅' : '❌'}</p>
                        <p>Permission: {motionPermissionStatus}</p>
                        {motionErrorBox && (
                            <p className="text-red-600">{motionErrorBox}</p>
                        )}
                    </div>
                </div>

                {/* Motion Data Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Motion Data</h3>
                    <pre className="bg-white p-2 rounded overflow-auto max-h-48 text-sm">
                        {JSON.stringify(motionData, null, 2)}
                    </pre>
                </div>

                {/* GPS Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        GPS Data {isGPSAvailable ? '✅' : '❌'}
                    </h3>
                    <pre className="bg-white p-2 rounded overflow-auto max-h-48 text-sm">
                        {JSON.stringify(GPSReadings, null, 2)}
                    </pre>
                    {error && (
                        <p className="text-red-600 mt-2">{error}</p>
                    )}
                </div>
            </div>
        );
    };
        
    const LoggerContextValues = {
        // GPS data
        GPSReadings,
        error,
        isGPSAvailable,
        getGPSData,
        resetGPSDataLog,
        // Motion data
        motionData,
        motionAskForPerms,
        isMotionAvailable,
        motionPermissionStatus,
        motionErrorBox,
        //diagnostics
        DiagnosticsDisplay
    };

    return (
            <LoggerContext.Provider value={LoggerContextValues}>
                {children}    
            </LoggerContext.Provider>      
    );
};

LoggerProvider.propTypes = {
    //children can be any valid react node
    children : PropTypes.node.isRequired
};
