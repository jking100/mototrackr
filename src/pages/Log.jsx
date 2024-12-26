import { DeviceMotionProvider } from "@/components/features/deviceMotion/";
import { DeviceMotionTable } from "@/components/DeviceMotionTable";

export function Log() {
    return (
        <DeviceMotionProvider>
            <DeviceMotionTable />
        </DeviceMotionProvider>
    );
}