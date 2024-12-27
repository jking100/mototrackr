//this component must be used within deviceMotionProvider wrapper

import { useDeviceMotion } from "@/components/features/deviceMotion/";
import { useState, useEffect, useRef } from "react";
import { LeanAngleContext } from './leanAngleContext.jsx';
import PropTypes from 'prop-types';

export const LeanAngleProvider = ({children}) => {
    const { motionData, /*isAvailable, permissionStatus*/ } = useDeviceMotion();
    const [leanAngle1Axis, setLeanAngle1Axis] = useState(0);
    const [leanAngle2Axis, setLeanAngle2Axis] = useState(0);
    const lastMeasurement = useRef(0);
    useEffect(()=>{
        //alert("updataing lean angle");
        //update lean angle whenever we get new motion data - throttle this
        //motion data seems to stream in at a cap of 50hz no matter what
        const elapsed = Date.now() - lastMeasurement.current;
        if (elapsed > 1000 / 5){
            //alert(`updating lean angle @ ${1000/elapsed}Hz`);
            lastMeasurement.current = Date.now();

            //see bottom of file for math explanation
            
            setLeanAngle1Axis( //not very accurate for testing, dont use
                // will produce NaN if abs(xGrav) > 9.8 so clamp to -1 thru 1 returns number [-90->90] 
                Math.asin(Math.max(-1, Math.min(1, motionData.acceleration.xGrav / 9.8))) * (180 / Math.PI)
            );

            //2axis equation thanks to https://www.analog.com/en/resources/app-notes/an-1057.html
            //measures differently that the ones above. this measures tilt with phone flat and y axis direction of tilt
            setLeanAngle2Axis(
                -Math.atan(motionData.acceleration.xGrav/motionData.acceleration.yGrav) * (180 / Math.PI)
            );
        }
    },[motionData]);

    return (
        <LeanAngleContext.Provider value={{ leanAngle1Axis, leanAngle2Axis }}>
            {/*unsure if i need anything else in here, leave it for now */}
            {children}
        </LeanAngleContext.Provider>
    );
};

LeanAngleProvider.propTypes = {
    //children can be any valid react node
    children : PropTypes.node.isRequired
};

//below is lean equation. this is assuming the y axis is primary axis
//i.e. the one that determines straight up and down. (in this case literally phone straight up and down)
//we use x axis in the equation because when i graphed the y axis version of this
// the sensitivity would have been worse at usual lean angle(0 degrees) and better at impossible angles(90 degrees(you crashed))
//so operate on the perpendicual axis
//equations takes (x) in meters per second and returns a value in degrees with + representing lean to right
//arcsin(abs(x)/9.8)*180/pi

//https://www.analog.com/en/resources/app-notes/an-1057.html

//so on a bike with landscape phone mounting which seems to be common.
// the iphones y axis would be the one directly perpendicular to gravity and path of travel.
// z would be G. so i think i should get my tilt from y and z axis as x axis will be in line with the motorcycles
// path of travel, so i think that axis will have the least reliable readings in this situation
