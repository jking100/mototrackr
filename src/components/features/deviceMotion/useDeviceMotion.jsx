import { useEffect, useState, useRef } from "react";

export function useDeviceMotion(refreshHZ = 25) {
    const avg = arr => arr.reduce((acc,v,i,a)=>(acc+v/a.length),0);

    const lastUpdateTime = useRef(0); // Store last update time for throttling
    const minTimeBetweenUpdates = useRef(1000 / refreshHZ); // Convert Hz to minimum time between updates in ms
    
    const [permissionStatus, setPermissionStatus] = useState(false);
    const [permissionNeeded, setPermissionNeeded] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false);
    const avg15value = useRef(0);
    const rollingAverage15 = useRef([
        0,0,0,0,0,
        0,0,0,0,0,
        0,0,0,0,0
    ]);
    
    const [motionData, setMotionData] = useState({
        acceleration: {
            x: 0, y: 0, z: 0
        },
        accelerationIncludingGravity: {
            x: 0, y: 0, z: 0
        },
        tilt: {
            //measures tilt in the y axis with phone flat (will not work if vertical)
            flatYaxis: 0,
            flatY15Avg: 0
        },
        rotationRate: {
            alpha: 0, beta: 0, gamma: 0
        }
    });
    
    const errorBox = 
        (permissionStatus !== true && permissionNeeded)
        ? (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>Fatal Error: Sensor access</p>
            </div>
        )
        : null;
        
    const initializeDeviceMotion = () => {
        const handleMotion = (event) => {
            const now = Date.now();
            // Skip refresh if last refresh was too recent
            if (now - lastUpdateTime.current < minTimeBetweenUpdates.current) {
                return;
            }
            lastUpdateTime.current = now;
            
            if (event.accelerationIncludingGravity && event.acceleration) {
                //alert("handling motion");
                const leanY = Math.atan(event.accelerationIncludingGravity.y/event.accelerationIncludingGravity.z) * (180 / Math.PI);
                avg15value.current = avg(rollingAverage15);
                if (( leanY > avg15value.current + 15) || (leanY > avg15value.current * 2)) {
                    //spike reading
                    rollingAverage15.unshift(avg15value.current * 2);
                    rollingAverage15.pop();
                } else {
                    //good reading
                    rollingAverage15.unshift(leanY * 2);
                    rollingAverage15.pop();
                }
                avg15value.current = (avg(rollingAverage15));

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
                        flatYaxis: Math.atan(event.accelerationIncludingGravity.y/event.accelerationIncludingGravity.z) * (180 / Math.PI),
                        flatY15Avg: avg15value.current.toFixed(0)
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

    const askForPerms = async () => {
        if (permissionStatus === true) {
            return true;
        }

        if (permissionNeeded === false) {
            setPermissionStatus(true);
            return true;
        }

        //only browsers/devices with a required request permission method will reach here
        try {
            const permission = await DeviceMotionEvent.requestPermission();
            if (permission === "granted") {
                setPermissionStatus(true);
                return true;
            } else {
                alert(`Failure in DeviceMotion hook: Failed to get motion permissions - ${permission}`);
                setPermissionStatus(false);
                return false;
            }

        } catch (error) {
            alert(`Error in DeviceMotion hook: Error requesting DeviceMotion permissions - ${error}`);
            setPermissionStatus(false);
            return false;
        }
    };

    //(mount effect) initialize our motion api status variable in here
    useEffect(() => {
        // First, check if the device supports motion events
        if (!window.DeviceMotionEvent) {
            alert("!!!FATAL ERROR!!!: Your device appears to not have/support access to required sensors for this app");
            return;
        }

        setIsAvailable(true);
        setPermissionNeeded(
            typeof DeviceMotionEvent.requestPermission === 'function'
        );
    }, []);

    //initialize deviceMotion event handling once granted permissions
    useEffect(()=>{
        if (permissionStatus === true) {
            initializeDeviceMotion();
        }
    },[permissionStatus]);


    return {motionData, isAvailable, permissionStatus, errorBox, askForPerms};
}
