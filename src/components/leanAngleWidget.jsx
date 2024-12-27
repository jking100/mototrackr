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
import { useLeanAngle } from "@/components/features/leanAngle";

export function LeanAngleWidget(){
    const { leanAngle } = useLeanAngle();

    return (
        <>
            <p>Teast - LeanAngleWidget.jsx</p>
            {leanAngle &&(
                <div>
                <p>2 Axis formula - Value: {leanAngle.leanAngle2Axis.toFixed(0)} </p>
                <input type="range" min="-90" max="90" value={leanAngle.leanAngle2Axis} className="range range-accent" />
                <br />
                <p>1 Axis formula - Value: {leanAngle.leanAngle1Axis.toFixed(0)} </p>
                <input type="range" min="-90" max="90" value={leanAngle.leanAngle1Axis} className="range range-accent" />
                </div>
            )}
            {!leanAngle &&(
                <div>
                <p>Issue with reading lean angle</p>
                {alert(typeof leanAngle)}
                </div>
            )}
        </>
    );
    /*
    return(
        <div className="outline">
            <p>LeanAngleWidget.jsx</p>
            <p>2 Axis formula - Value: {leanAngle.leanAngle2Axis.toFixed(0)} </p>
            <input type="range" min="-90" max="90" value={leanAngle.leanAngle2Axis} className="range range-accent" />
            <br />w
            <p>1 Axis formula - Value: {leanAngle.leanAngle1Axis.toFixed(0)} </p>
            <input type="range" min="-90" max="90" value={leanAngle.leanAngle1Axis} className="range range-accent" />
        </div>
    );
    */
}