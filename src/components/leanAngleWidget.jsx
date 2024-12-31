//resource: https://www.analog.com/en/resources/app-notes/an-1057.html covers some math, will need adapting

//status 12/26: working tech demo of 1 axis tilt, could use somesmoothing on the rendered data

//todo: brush up the 2 axis tilt, read paper to see if there is a way to do 3 axis
//      implement smoothing on the values either on the way in or out
//      possibly abstract tilt handling away so that we can easily call it anywhere (useful for future plans)

//faroff(post first live release): create 2d map of gps tags bundled with lean angle at that time. this can be done 
//          with a bit of math certainly
//          overlay a colered line indicating measured lean angle at gps point
//          udate screen at person usable frequency but update lean angle+gps maybe 
//          every 5 or so seconds because super high resolution not needed for map

//import { useEffect, useState, useRef } from "react";
import { useDeviceMotion } from "@/components/features/deviceMotion";
import { MotorcycleLeanGauge } from "@/components/ui/MotorcycleLeanGauge";

export function LeanAngleWidget(){
    const { motionData, isAvailable, permissionState, errorBox } = useDeviceMotion();
    
    //write a throttled useffect here to average and slow the readings display for the widget

    return (
        <>
            {isAvailable &&(
                <div className="bg-slate-500 artboard-demo artboard-horizontal phone-1">
                    < MotorcycleLeanGauge leanAngle={motionData.tilt.flatYaxis}/>
                </div>
            )}
            {!isAvailable &&(
                <p>Issue with access to device accelerometer</p>
            )}
            {errorBox}
        </>
    );
}