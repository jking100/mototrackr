import { DeviceMotionProvider } from "@/components/features/deviceMotion/";
import { DeviceMotionTable } from "@/components/DeviceMotionTable";
import { LeanAngleWidget } from "@/components/LeanAngleWidget";
import { GPSWidget } from "@/components/GPSWidget";
import { GPSProvider } from "@/components/features/geolocation";
import { useState } from "react";
import { NavBar } from "@/components/ui/NavBar";

export function Test() {
    const [showLean, setShowLean] = useState(false);
    const [showGPS, setShowGPS] = useState(false);
    const [showAccelerometer, setShowAccelerometer] = useState(false);
    return (
        <>
            <NavBar/>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    id="lean"
                    checked={showLean}
                    onChange={() => setShowLean(!showLean)}
                    />
                    <label htmlFor="lean">Show Lean Angle widget</label>
                </div>
            
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    id="gps"
                    checked={showGPS}
                    onChange={() => setShowGPS(!showGPS)}
                    />
                    <label htmlFor="gps">Show GPS data</label>
                </div>
                
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    id="accel"
                    checked={showAccelerometer}
                    onChange={() => setShowAccelerometer(!showAccelerometer)}
                    />
                    <label htmlFor="accel">Show Accelerometer data</label>
                </div>
            </div>

            {showLean && (
                <DeviceMotionProvider>
                        <LeanAngleWidget />
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