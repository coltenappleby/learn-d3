import logo from './logo.svg';
import './App.css';
import React from 'react';
import { arc } from 'd3'

const width = 960;
const height = 500;
const centerX = width/2
const centerY = height/2
const strokeWidth = 20
const eyeOffsetX = 90
const eyeOffsetY = 100
const eyeRadius = 50;
const mouthWidth = 20
const mouthRadius = 140

const mouthArc = arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius+mouthWidth)
  .startAngle(Math.PI / 2)
  .endAngle(Math.PI * 3/2)

const BackgroundCircle = ({ radius, color}) => (
  <circle
    r={radius}
    fill={color}
    stroke="black"
    stroke-width="10"
  />
)

function App() {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
 
        <BackgroundCircle radius={centerY - strokeWidth/2} color ={'yellow'}/>
        <circle
          cx={-eyeOffsetX}
          cy={-eyeOffsetY}
          r={eyeRadius}
        />
        <circle
          cx={eyeOffsetX}
          cy={-eyeOffsetY}
          r={eyeRadius}
        />
        <path d={mouthArc()}></path>
      </g>
    </svg>
  );
}

export default App;