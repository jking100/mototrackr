import { useContext } from "react";
import { LeanAngleContext } from "./LeanAngleContext";

export function useLeanAngle() {
    const context = useContext(LeanAngleContext);

    if (!context) {
        throw new Error("Error: useLeanAngle() must be used inside a LeanAngleProvider.");
    }

    return { 
        leanAngle: {
            leanAngle1Axis: context.leanAngle1Axis,
            leanAngle2Axis: context.leanAngle2Axis
        }
    };
}
