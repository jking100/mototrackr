import { DeviceMotionProvider } from "@/components/features/deviceMotion/";
import { DeviceMotionTable } from "@/components/DeviceMotionTable";
import { LeanAngleWidget } from "@/components/LeanAngleWidget";
import { LeanAngleProvider } from "@/components/features/leanAngle";

export function Log() {
    return (
        <DeviceMotionProvider>
            <LeanAngleProvider>
                <LeanAngleWidget />
            </LeanAngleProvider>
            
            <DeviceMotionTable />
        </DeviceMotionProvider>
    );
}