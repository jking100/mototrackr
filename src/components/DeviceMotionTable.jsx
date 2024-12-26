//this component must be used within deviceMotionProvider wrapper

import { useDeviceMotion } from "@/components/features/deviceMotion/";

export function DeviceMotionTable (){
    const { motionData, isAvailable, permissionStatus } = useDeviceMotion();
    return (
        <div className="grid gap-6">
            <br />
                <h3>Avail.: {isAvailable ? "Yes" : "No"} | Perms: {permissionStatus ? "Yes" : "No"}</h3>
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
    );
}