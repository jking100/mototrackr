import { MotorcycleLeanGauge } from "@/components/ui/MotorcycleLeanGauge";
import PropTypes from 'prop-types';

export function LeanAngleWidget({motionData}){

    const angle = motionData.tilt.flatYaxis;

    return (
        <div className="bg-slate-500 artboard-demo artboard-horizontal phone-1">
            < MotorcycleLeanGauge leanAngle={angle}/>
        </div>
    );
}

LeanAngleWidget.propTypes = {
    //children can be any valid react object
    motionData : PropTypes.object
};
