import { DeviceMotionProvider } from "@/components/features/deviceMotion/";
import { DeviceMotionTable } from "@/components/DeviceMotionTable";
import { LeanAngleWidget } from "@/components/features/leanAngle/leanAngleWidget";

export function Log() {
    return (
        <DeviceMotionProvider>
            <LeanAngleWidget />
            <DeviceMotionTable />
        </DeviceMotionProvider>
    );
}