import  {useState, useEffect} from 'react';
import { DeviceMotionContext } from './DeviceMotionContext';
import PropTypes from 'prop-types';

export const DeviceMotionProvider = ({ children }) => {

    const [permissionStatus, setPermissionStatus] = useState('unknown');
    const [isAvailable, setIsAvailable] = useState(false);
    const [motionData, setMotionData] = useState({
        acceleration: {
            x: 0, y: 0, z: 0
        },
        accelerationIncludingGravity: {
            x: 0, y: 0, z: 0
        },
        tilt: {
            horizontalTilt: 0
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
                        //targets lean in y axis with phone flat landscape
                        //even without calibration seems to be very accurate, i suspect do to not relying on an assumption
                        //that the sensor will read the full force of gravity at rest (no hard coded G=-9.8...)
                        horizontalTilt: Math.atan(event.accelerationIncludingGravity.y/event.accelerationIncludingGravity.z) * (180 / Math.PI)
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

    const requestPermission = async () => {
        //Rework this
        // Check if we need to request permission on iphones/safari
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
          try {
            const permission = await DeviceMotionEvent.requestPermission();
            setPermissionStatus(permission);
            
            if (permission === 'granted') {
              initializeDeviceMotion();
            }
          } catch (error) {
            console.error('Error requesting device motion permission:', error);
            setPermissionStatus('denied');
          }
        } else {
          // No permission needed (non-iOS devices)
          setPermissionStatus('granted');
          initializeDeviceMotion();
        }
    };

    useEffect(() => {
        // First, check if the device supports motion events
        if (!window.DeviceMotionEvent) {
            setIsAvailable(false);
            return;
        }
        setIsAvailable(true);

        console.log(`in my useeffect in provider ${typeof DeviceMotionEvent.requestPermission}`);

        // For non-iOS devices, we can initialize right away
        // For iOS, we'll wait for explicit permission
        if (typeof DeviceMotionEvent.requestPermission !== 'function') {
            console.log("in here");
            setPermissionStatus('granted');
            initializeDeviceMotion();
        }
    }, []);

    return (
        <DeviceMotionContext.Provider value={{ motionData, isAvailable, permissionStatus }}>
            {/* Permission request UI only shows when needed */}
            {isAvailable && permissionStatus !== 'granted' && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 p-4 rounded-lg shadow-lg z-50">
                    <p className="text-white mb-2">Device motion access is required</p>
                    <button 
                        onClick={requestPermission}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Grant Access
                    </button>
                </div>
            )}
            {children}
        </DeviceMotionContext.Provider>
    );
};

DeviceMotionProvider.propTypes = {
    // children can be any valid React node (elements, strings, numbers, etc.)
    children: PropTypes.node.isRequired
};