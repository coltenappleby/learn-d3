import React from 'react'



export const BackgroundCircle = ({ radius, color, strokeWidth}) => (
    <circle
      r={radius}
      fill={color}
      stroke="black"
      stroke-width={strokeWidth}
    />
)