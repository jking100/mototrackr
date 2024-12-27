//resource: https://www.analog.com/en/resources/app-notes/an-1057.html covers some math, will need adapting

//status 12/26: working tech demo of 1 axis tilt, could use somesmoothing on the rendered data

//todo: work on getting multiaxis tilt running because it will be needed in real world
//      possibly abstract tilt handling away so that we can easily call it anywhere (useful for future plans)

//faroff(post first live release): create 2d map of gps tags bundled with lean angle at that time. this can be done 
//          with a bit of math certainly
//          overlay a colered line indicating measured lean angle at gps point
//          udate screen at person usable frequency but update lean angle+gps maybe 
//          every 5 or so seconds because super high resolution not needed for map

import { useEffect, useState, useRef } from "react";
import { useDeviceMotion } from "../deviceMotion";

export function LeanAngleWidget(){
    const [leanAngle, setLeanAngle] = useState(0);
    const [leanAngleLinear, setLeanAngleLinear] = useState(0);
    const { motionData, isAvailable, permissionStatus } = useDeviceMotion();
    const lastMeasurement = useRef(0);


    useEffect(()=>{
        //update lean angle whenever we get new motion data - throttle this
        //motion data seems to stream in at a cap of 50hz no matter what
        const elapsed = Date.now() - lastMeasurement.current;
        if (elapsed > 1000 / 5){
            //alert(`updating lean angle @ ${1000/elapsed}Hz`);
            lastMeasurement.current = Date.now();
            //below is lean equation. this is assuming the y axis is primary axis
            //i.e. the one that determines straight up and down. (in this case literally phone straight up and down)
            //we use x axis in the equation because when i graphed the y axis version of this
            // the sensitivity would have been worse at usual lean angle(0 degrees) and better at impossible angles(90 degrees(you crashed))
            //so operate on the perpendicual axis
            //equations takes (x) in meters per second and returns a value in degrees with + representing lean to right
            //arcsin(abs(x)/9.8)*180/pi

            setLeanAngle(
                //for testing random int -90 to 90 inclusive
                // will produce NaN if abs(xGrav) > 9.8 so clamp to -1 thru 1 
                Math.asin(Math.max(-1, Math.min(1, motionData.acceleration.xGrav / 9.8))) * (180 / Math.PI)
            );

            //for testing a straight linear lean angle formula because im sketched about my math
            setLeanAngleLinear(
                (90/9.8) * motionData.acceleration.xGrav
            );
        }
    },[motionData]);

    return(
        <div className="outline">
            <p>LeanAngleWidget.jsx</p>
            <p>Trig. formula: </p>
            <input type="range" min="-90" max="90" value={leanAngle} className="range range-accent" />
            <br />
            <p>Linear forumla: </p>
            <input type="range" min="-90" max="90" value={leanAngleLinear} className="range range-accent" />

            <p>{leanAngle}||{leanAngleLinear}</p>
        </div>
    );
}