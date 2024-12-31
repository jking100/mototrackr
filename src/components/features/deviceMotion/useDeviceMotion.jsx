import { useEffect, useState, useRef } from "react";

export function useDeviceMotion(refreshHZ) {
    const [permissionStatus, setPermissionStatus] = useState(false);
    const [permissionNeeded, setPermissionNeeded] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false);
    const [motionData, setMotionData] = useState({
        acceleration: {
            x: 0, y: 0, z: 0
        },
        accelerationIncludingGravity: {
            x: 0, y: 0, z: 0
        },
        tilt: {
            //measures tilt in the y axis with phone flat (will not work if vertical)
            flatYaxis: 0
        },
        rotationRate: {
            alpha: 0, beta: 0, gamma: 0
        }
    });

    const initializeDeviceMotion = () => {
        const handleMotion = (event) => {
            if (event.accelerationIncludingGravity && event.acceleration) {
                setMotionData({
                    accelerationIncludingGravity: {
                    x: event.accelerationIncludingGravity.x ?? 0,
                    y: event.accelerationIncludingGravity.y ?? 0,
                    z: event.accelerationIncludingGravity.z ?? 0,
                    },
                    acceleration: {
                        x: event.acceleration.x ?? 0,
                        y: event.acceleration.y ?? 0,
                        z: event.acceleration.z ?? 0
                    },
                    tilt: {
                        //2axis equation thanks to https://www.analog.com/en/resources/app-notes/an-1057.html
                        //targets lean in y axis with phone flat
                        //even without calibration seems to be very accurate, i suspect do to not relying on an assumption
                        //that the sensor will read the full force of gravity at rest (no hard coded G=-9.8...)
                        flatYaxis: Math.atan(event.accelerationIncludingGravity.y/event.accelerationIncludingGravity.z) * (180 / Math.PI)
                    },
                    rotationRate: {
                    alpha: event.rotationRate?.alpha ?? 0,
                    beta: event.rotationRate?.beta ?? 0,
                    gamma: event.rotationRate?.gamma ?? 0
                    }
                });
            }
        };
        window.addEventListener('devicemotion', handleMotion);

        // Cleanup function
        return () => {
            window.removeEventListener('devicemotion', handleMotion);
        };
    };

    useEffect(() => {
        // First, check if the device supports motion events
        if (!window.DeviceMotionEvent) {
            return;
        }
        setIsAvailable(true);

        const motionInit = async () => {
            const requestPerms = async () => {
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    try {
                        const permission = await DeviceMotionEvent.requestPermission();
                        setPermissionStatus(permission);
                        return permission;
                    } catch (error) {
                        alert('Error requesting device motion permission:', error);
                        setPermissionStatus('denied');
                        return "denied";
                    }
                }
            };

            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                setPermissionNeeded(true);
                const response = await requestPerms();

                await response === "granted" 
                    ? initializeDeviceMotion() 
                    : alert("Failed to start motion listener. Please restart browser.");
            } else {
                setPermissionNeeded(false);
                initializeDeviceMotion();
            }

        };

        motionInit();

    }, []);

    const errorBox = 
        (permissionStatus !== "granted" && permissionNeeded)
        ? (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>Error: Sensor access, Please restart browser</p>
            </div>
        )
        : null;

    return {motionData, isAvailable, permissionStatus, errorBox};
}