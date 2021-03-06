import React, { useEffect, useState, useCallBack } from "react";
import { csv, arc, pie } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/coltenappleby/bf283f12acc2bbb2ddc83ecf7b07441b/raw/colors.csv";
const width = 960;
const height = 500;
const centerX = width/2;
const centerY = height/2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width)

const PieChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const colorPie = pie().value(1)

  return (
    <svg width={width} height={height} >
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data).map(d => (
          <path 
            fill={d.data["Hex"]} 
            d={ pieArc(d)}
          /> 
        ))}

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
