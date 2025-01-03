import PropTypes from 'prop-types';

import { useContext, useState, useEffect } from 'react';

import { LoggerContext } from './LoggerContext';

import { LeanAngleWidget } from '@/components/widgets/leanAngleWidget';

export default function AppRecord ({onEndRide}) {

    /*
    const LoggerContextValues = {
        // GPS data
        GPSReadings,
        error,
        isGPSAvailable,
        getGPSData,
        resetGPSDataLog,
        // Motion data
        motionData,
        isMotionAvailable,
        motionPermissionStatus,
        motionErrorBox
        //diagnostics
        DiagnosticsDisplay
    };
    */
    const Logger = useContext(LoggerContext);

    return (
        <div className="p-4">
            <LeanAngleWidget motionData={Logger.motionData} />
            
            <div className="space-x-4 mb-4">
                <button 
                    onClick={onEndRide}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    End Ride
                </button>
                <button 
                    onClick={() => alert("Clicked Reset Ride")}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Reset Ride
                </button>
            </div>

            {Logger.DiagnosticsDisplay()}
        </div>
    );
}

AppRecord.propTypes = {
    onEndRide: PropTypes.func.isRequired
};
