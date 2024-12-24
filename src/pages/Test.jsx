import { useState, useEffect } from 'react';

export function Test() {
    //needed on ios, we have to get perms before access sensor
    //unknown || granted || error
    const [permissionStatus, setPermissionStatus] = useState('unknown');
    //const [hasPermission, setHasPermission] = useState(false);
    const [motionData, setMotionData] = useState({
        acceleration: {
            xGrav: 0, yGrav: 0, zGrav: 0, x: 0, y: 0, z: 0
        },
        rotationRate: {
            alpha: 0, beta: 0, gamma: 0,
        },
    });

    const handleMotion = (event) => {
        if (event.accelerationIncludingGravity && event.acceleration) {
            setMotionData({
                acceleration: {
                xGrav: event.accelerationIncludingGravity.x ?? 0,
                yGrav: event.accelerationIncludingGravity.y ?? 0,
                zGrav: event.accelerationIncludingGravity.z ?? 0,
                x: event.acceleration.x ?? 0,
                y: event.acceleration.y ?? 0,
                z: event.acceleration.z ?? 0
                },
                rotationRate: {
                alpha: event.rotationRate?.alpha ?? 0,
                beta: event.rotationRate?.beta ?? 0,
                gamma: event.rotationRate?.gamma ?? 0
                }
            });
        }
    };
        
    const requestPermission = async () => {
        try {
          // Check if we need to request permission (iOS devices)
          if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
            const permission = await window.DeviceMotionEvent.requestPermission();
            setPermissionStatus(permission);
            
            if (permission === 'granted') {
              window.addEventListener('devicemotion', handleMotion);
            }
          } else {
            // For non-iOS devices, we can add the listener directly
            setPermissionStatus('granted');
            window.addEventListener('devicemotion', handleMotion);
          }
        } catch (error) {
          console.error('Error requesting motion permission:', error);
          setPermissionStatus('error');
        }
    };

    useEffect(() => {
        return () => {
          window.removeEventListener('devicemotion', handleMotion);
        };
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Device Motion Data</h1>

            {(permissionStatus === "unknown") && (
                <button 
                    onClick={requestPermission}
                    className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Enable Motion Detection
                </button>
            )} 

            {(permissionStatus === "granted") && (
            <div className="grid gap-6">
                <div className="bg-slate-500 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Acceleration</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">X-Axis</div>
                            <div className="font-mono text-gray-900 dark:text-white">{motionData.acceleration.x.toFixed(2)} m/s²</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">Y-Axis</div>
                            <div className="font-mono"><p>{motionData.acceleration.y.toFixed(2)} m/s²</p></div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">Z-Axis</div>
                            <div className="font-mono"><p>{motionData.acceleration.z.toFixed(2)} m/s²</p></div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-500 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Acceleration with Gravity</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">X-Axis</div>
                            <div className="font-mono">{motionData.acceleration.xGrav.toFixed(2)} m/s²</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">Y-Axis</div>
                            <div className="font-mono">{motionData.acceleration.yGrav.toFixed(2)} m/s²</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">Z-Axis</div>
                            <div className="font-mono">{motionData.acceleration.zGrav.toFixed(2)} m/s²</div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-500 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Rotation Rate</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">Alpha</div>
                            <div className="font-mono">{motionData.rotationRate.alpha.toFixed(2)}°/s</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">Beta</div>
                            <div className="font-mono">{motionData.rotationRate.beta.toFixed(2)}°/s</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-200 mb-1">Gamma</div>
                            <div className="font-mono">{motionData.rotationRate.gamma.toFixed(2)}°/s</div>
                        </div>
                    </div>
                </div>
            </div>
            )} 
        </div>
    );
}