import React, { useState, useEffect } from "react";
import { csv, scaleBand, scaleLinear, max } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/coltenappleby/dff3bf4bd88fe6af992fc18408d91aeb/raw/c691db388bea061c48757bb785b6c8e3f611a4a7/UN_Pop_2019.csv";

const width = 960;
const height = 500;

const BarChart = ({ width = 960, height = 500 }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"]; // + is unary plus which is similar to parseFloat aka String to Number
      return d;
    };
    csv(csvUrl, row).then(data => {
        setData(data.slice(0,10))
    });
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

//   console.log(data[0]);

  const yScale = scaleBand() // invokes scaleband constructor that creates a new band scale LOL
    .domain(data.map((d) => d.Country)) //setting the domain to the country
    .range([0, height]); //takes the min and max of the areas of the chart

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, width]);

  return (
    <>
      <h1> Bar Chart </h1>

      <svg width={width} height={height}>
        {data.map((d) => (
          <rect
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          /> 
        ))}
      </svg>
    </>
  );
};

export default BarChart;
