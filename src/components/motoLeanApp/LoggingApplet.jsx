import { useState, useEffect, useContext, useRef } from "react";
import { GPSContext } from "@/components/features/geolocation/GPSContext";
import { LeanAngleWidget } from "@/components/leanAngleWidget";

export function LoggingApplet() {
    const [flow, setFlow] = useState("init"); // init, record, submit
    const [isLoggingComplete, setIsLoggingComplete] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState("");

    const GPSData = useContext(GPSContext);

    if (!GPSData) {
        throw new Error("Error: GPSContext must be used inside a GPSContext.Provider");
    }

    useEffect(() => {
        let intervalId;

        if (isRecording) {
            //console.log("hello");
            // Set up interval for GPS logging
            intervalId = setInterval(() => {
                GPSData.getGPSData();
            }, 5000); // Log every 5 seconds
        }

        // Cleanup function
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRecording, GPSData]);

    const handleStart = () => {
        GPSData.resetGPSDataLog(); // Clear any previous readings
        setIsRecording(true);
        setFlow("record");
    };

    const handleStop = () => {
        setIsRecording(false);
        setIsLoggingComplete(true);
        setFlow("submit");
    };

    return (
        <div className="container mx-auto p-4">
            {GPSData.error && (
                <div className="alert alert-error mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="whitespace-pre-line">{GPSData.error}</span>
                </div>
            )}

            {flow === "init" && (
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">GPS Logging</h2>
                        <p className="mb-4">Before starting, please ensure:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Location permissions are enabled</li>
                            <li>You have a clear view of the sky</li>
                            <li>Your device GPS is turned on</li>
                        </ul>
                        <button className="btn btn-primary" onClick={handleStart}>
                            Start Logging
                        </button>
                    </div>
                </div>
            )}

            {flow === "record" && (
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Recording in Progress</h2>
                        <LeanAngleWidget/>
                        
                        <div className="mt-4">
                            <p>Latest Reading:</p>
                            {GPSData.GPSReadings.length > 0 && (
                                <div className="text-sm">
                                    <p>Time: {GPSData.GPSReadings[GPSData.GPSReadings.length - 1].timestamp}</p>
                                    <p>Readings Collected: {GPSData.GPSReadings.length}</p>
                                </div>
                            )}
                        </div>

                        <button className="btn btn-error mt-4" onClick={handleStop}>
                            Stop Logging
                        </button>
                    </div>
                </div>
            )}

            {flow === "submit" && isLoggingComplete && (
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Logging Complete</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Accuracy (m)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {GPSData.GPSReadings.map((reading, index) => (
                                        <tr key={index}>
                                            <td>{reading.timestamp}</td>
                                            <td>{reading.latitude.toFixed(6)}</td>
                                            <td>{reading.longitude.toFixed(6)}</td>
                                            <td>{reading.accuracy.toFixed(1)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
