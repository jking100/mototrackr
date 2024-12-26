import { useContext } from "react";
import { DeviceMotionContext } from "./DeviceMotionContext";

export function useDeviceMotion() {
    const context = useContext(DeviceMotionContext);

    if (!context) {
        throw new Error("Error: useDeviceMotion() must be used inside a DeviceMotionProvider");
    }

    const { motionData, isAvailable, permissionState } = context;
    return { motionData, isAvailable, permissionState };
}