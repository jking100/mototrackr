import { DeviceMotionProvider } from "@/components/features/deviceMotion/";
import { DeviceMotionTable } from "@/components/DeviceMotionTable";
import { LeanAngleWidget } from "@/components/LeanAngleWidget";
//import { LeanAngleProvider } from "@/components/features/leanAngle";
import { GPSWidget } from "@/components/GPSWidget";
import { useState } from "react";
import { GPSProvider } from "@/components/features/geolocation";

//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

export function Test() {
    //const [view, setView] = useState("none"); //none | lean | accelerometer | 
    const [showLean, setShowLean] = useState(false);
    const [showGPS, setShowGPS] = useState(false);
    const [showAccelerometer, setShowAccelerometer] = useState(false);
    //const [showLean, setShowLean] = useState(false);
    return (
        <>
        <div style={{display: "flex", flexDirection: "column"}}>
            <input type="checkbox" id="lean" onClick={()=>{setShowLean(!showLean);}} />
            <label htmlFor="lean">Show Lean Angle widget</label>
            <input type="checkbox" id="gps" onClick={()=>{setShowGPS(!showGPS);}} />
            <label htmlFor="gps">Show GPS data</label>
            <input type="checkbox" id="accel" onClick={()=>{setShowAccelerometer(!showAccelerometer);}} />
            <label htmlFor="accel">Show Accelerometer data</label>
        </div>

            {showLean && (
                <DeviceMotionProvider>
                    <LeanAngleProvider>
                        <LeanAngleWidget />
                    </LeanAngleProvider>
                </DeviceMotionProvider>
            )}
            {showGPS && (
                <GPSProvider>
                    <GPSWidget />
                </GPSProvider>
            )}
            {showAccelerometer && (
                <DeviceMotionProvider>
                    <DeviceMotionTable />
                </DeviceMotionProvider>
            )}
        </>
    );
}