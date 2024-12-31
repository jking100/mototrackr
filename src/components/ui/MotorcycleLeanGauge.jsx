//https://www.npmjs.com/package/react-gauge-component

//import React from 'react';
//import { Card, CardContent } from '@/components/ui/card';
import PropTypes from 'prop-types';
import { GaugeComponent } from 'react-gauge-component';


export const MotorcycleLeanGauge = ({ 
    leanAngle = 0, // Current lean angle
    maxAngle = 75 //abs(lean)
  }) => {
    
    return (
        <GaugeComponent
          type="semicircle"
          minValue={-maxAngle}
          maxValue={maxAngle}
          value={leanAngle}
          
          // Arc configuration
          arc={{
            width: 0.2,  // Width of the arc
            padding: 0.02,  // Padding between subarcs
            cornerRadius: 1,  // Rounded corners
            subArcs: [
              { 
                limit: -45, 
                color: '#EA4288',  // Empty/grey color
                showTick: true 
              },
              { 
                limit: -30, 
                color: '#F5CD19',  // Red
                showTick: true 
              },
              { 
                limit: -15, 
                color: '#5BE12C',  // Yellow
                showTick: true 
              },
              { 
                limit: 15, 
                color: '#5BE12C',  // Green
                showTick: true 
              },
              { 
                limit: 30, 
                color: '#5BE12C',  // Yellow
                showTick: true 
              },
              { 
                limit: 45, 
                color: '#F5CD19',  // Red
                showTick: true 
              },
              { 
                color: '#EA4288',  // Empty/grey color
                showTick: true
              }
            ]
          }}
          
          // Pointer configuration
          pointer={{
            type: "needle",
            color: "#cf6c65",
            length: 0.8,
            width: 10,
            animate: true,
            elastic: true
          }}
          
          // Labels configuration
          labels={{
            valueLabel: {
              matchColorWithArc: true,
              formatTextValue: (value) => `${Math.abs(value).toFixed(0)}°`,
              style: {
                fontSize: "40px",
                fill: "#000000",
                textShadow: "none"
              }
            },
            tickLabels: {
              type: "inner",
              ticks: [
                { value: -75 },
                { value: -65 },
                { value: -45 },
                { value: -30 },
                { value: -15 },
                { value: 0 },
                { value: 15 },
                { value: 30 },
                { value: 45 },
                { value: 75 }
              ],
              defaultTickValueConfig: {
                formatTextValue: (value) => `${Math.abs(value)}`,
              },
              defaultTickLineConfig: {
                length: 6,
                width: 2,
                color: "#000000"
              }
            }
          }}
          
          // Container style
          style={{ width: 400 }}
        />
      );
    };

MotorcycleLeanGauge.propTypes = {
    leanAngle: PropTypes.number,
    warningAngle: PropTypes.number,
    maxAngle: PropTypes.number
};