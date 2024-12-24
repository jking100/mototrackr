import { useState, useEffect } from 'react';

export function Test() {
    const [motionData, setMotionData] = useState({
        acceleration: {
            xGrav: 0, yGrav: 0, zGrav: 0,
            x: 0, y: 0, z: 0,
        },
        rotationRate: {
            alpha: 0, beta: 0, gamma: 0,
        },
    });

    useEffect(() => {
        if(window.DeviceMotionEvent){
            const handleMotion = (Event) => {
                if (Event.accelerationIncludingGravity) {
                    setMotionData({
                        acceleration: {
                            xGrav: Event.accelerationIncludingGravity,
                            yGrav: Event.accelerationIncludingGravity,
                            zGrav: Event.accelerationIncludingGravity,
                        }
                    });
                }
                if (Event.acceleration) {
                    setMotionData({
                        acceleration: {
                            x: Event.acceleration,
                            y: Event.acceleration,
                            z: Event.acceleration,
                        }
                    });
                }
                if (Event.rotationRate) {
                    setMotionData({
                        rotationRate: {
                            alpha: Event.rotationRate,
                            beta: Event.rotationRate,
                            gamma: Event.rotationRate,
                        }
                    });
                }
            };

            window.addEventListener("devicemotion", handleMotion);

            return () => window.removeEventListener("devicemotion", handleMotion);

        } else {
            //no support
            console.log("Error: DeviceMotion unsupported");
        }
    }, []);



    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Device Motion Data</h1>
            
            <div className="grid gap-6">
                {/* Linear Acceleration */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Acceleration</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">X-Axis</div>
                            <div className="font-mono">{motionData.acceleration.x.toFixed(2)} m/s²</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Y-Axis</div>
                            <div className="font-mono">{motionData.acceleration.y.toFixed(2)} m/s²</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Z-Axis</div>
                            <div className="font-mono">{motionData.acceleration.z.toFixed(2)} m/s²</div>
                        </div>
                    </div>
                </div>

                {/* Acceleration with Gravity */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Acceleration with Gravity</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">X-Axis</div>
                            <div className="font-mono">{motionData.acceleration.xGrav.toFixed(2)} m/s²</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Y-Axis</div>
                            <div className="font-mono">{motionData.acceleration.yGrav.toFixed(2)} m/s²</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Z-Axis</div>
                            <div className="font-mono">{motionData.acceleration.zGrav.toFixed(2)} m/s²</div>
                        </div>
                    </div>
                </div>

                {/* Rotation Rate */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Rotation Rate</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Alpha</div>
                            <div className="font-mono">{motionData.rotationRate.alpha.toFixed(2)}°/s</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Beta</div>
                            <div className="font-mono">{motionData.rotationRate.beta.toFixed(2)}°/s</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Gamma</div>
                            <div className="font-mono">{motionData.rotationRate.gamma.toFixed(2)}°/s</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
