import { DeviceMotionProvider } from "@/components/features/deviceMotion/";
import { DeviceMotionTable } from "@/components/DeviceMotionTable";
import { LeanAngleWidget } from "@/components/LeanAngleWidget";
import { LeanAngleProvider } from "@/components/features/leanAngle";
import { useState } from "react";

export function Test() {
    //const [view, setView] = useState("none"); //none | lean | accelerometer | 
    const [showLean, setShowLean] = useState(false);
    const [showAccelerometer, setShowAccelerometer] = useState(false);
    //const [showLean, setShowLean] = useState(false);
    return (
        <>
        <div style={{display: "flex", flexDirection: "column"}}>
            <input type="checkbox" id="lean" onClick={()=>{setShowLean(!showLean);}} />
            <label htmlFor="lean">Show Lean Angle widget</label>
            <input type="checkbox" id="accel" onClick={()=>{setShowAccelerometer(!showAccelerometer);}} />
            <label htmlFor="accel">Show Accelerometer data</label>
        </div>

        <DeviceMotionProvider>
            {showLean && (
                <LeanAngleProvider>
                    <LeanAngleWidget />
                </LeanAngleProvider>
            )}
            {showAccelerometer && (
                <DeviceMotionTable />
            )}
        </DeviceMotionProvider>
        </>
    );
}