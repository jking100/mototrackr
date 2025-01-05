import { useContext } from "react";
import { LoggerContext } from "@/components/motoLeanApp/LoggerContext";


import { MotorcycleLeanGauge } from "@/components/ui/MotorcycleLeanGauge";

export function GaugeDashboard() {
      const Logger = useContext(LoggerContext);
  return (
    <div className="card bg-base-200 h-dvh grid grid-cols-5 grid-rows-3 gap-2 p-2">
      <div className="card bg-base-300 row-span-2">1</div>
      <div className="card bg-base-300 col-span-3 row-span-2">
        <MotorcycleLeanGauge leanAngle={Logger.motionData.tilt.flatYaxis}/>
      </div>
      <div className="card bg-base-300 row-span-2 col-start-5">3</div>
      <div className="card bg-base-300 row-start-3">4</div>
      <div className="card bg-base-300 col-span-3 row-start-3">5</div>
      <div className="card bg-base-300 col-start-5 row-start-3">6</div>
    </div>
  );
}
