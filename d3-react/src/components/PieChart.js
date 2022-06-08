import React, { useEffect, useState, useCallBack } from "react";
import { csv, arc, pie, color } from "d3";

import './PieChart.css'

const csvUrl =
  "https://gist.githubusercontent.com/coltenappleby/bf283f12acc2bbb2ddc83ecf7b07441b/raw/colors.csv";
const width = 960;
const height = 500;
const centerX = width/2;
const centerY = height/2;
const radius = Math.min(width, height) / 2

const newData = [
  {
    'name' : 'colten',
    'value' : 99,
    'color' : 'blue'
  },
  {
    'name' : 'jeff',
    'value' : 1,
    'color' : 'red'
  }
]


const PieChart = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    setData(newData)
  }, []);
  
  if (!data) {
    return <pre>Loading...</pre>;
  }
  
  const colorPie = pie().value(d => d.value)
  console.log(colorPie[0])
  
  const pieArc = arc()
    .innerRadius(0)
    .outerRadius(radius)
  
  console.log(pieArc(data[0]))
  return (
    <svg width={width} height={height} >
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data).map((d, i) => {
          return (
          <>
            <path 
              fill={d.data["color"]} 
              d={pieArc(d)}
              key={data[i].name}
              id={d.name}
              /> 
              <text
                transform={`translate(${pieArc.centroid(d)})`}
                textAnchor='middle'
                color={'white'}
              >
                  {data[i].name}
              </text>
          </>
        )})}

      </g>



      {/* <g transform={`translate(${centerX}, ${centerY})`}>
      {data.map((d,i) => (
        <path 
          fill={d["Hex"]} 
          d={ pieArc({
            startAngle: i / data.length *2 * Math.PI, 
            endAngle: (i+1) / data.length *2 * Math.PI   
          })}
        />
      ))}
      </g> */}
    </svg>
  )
  
  

};

export default PieChart;
