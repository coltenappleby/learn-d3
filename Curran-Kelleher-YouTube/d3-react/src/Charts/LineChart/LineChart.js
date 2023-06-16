import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { scaleLinear, scaleTime, extent, tickStep, timeFormat } from "d3";
import { useData } from './useData.js'
import { AxisBottom } from './AxisBottom.js';
import { AxisLeft } from './AxisLeft.js';
import { Marks } from './Marks.js';


const width = 960;
const height = 500;
const margin = { top: 15, right: 20, bottom: 55, left: 100 }
const xAxisLabelOffset = 45
const yAxisLabelOffset = 45

const ScatterPlot = ({ width = 960, height = 500 }) => {
	const csvUrl =
		"https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv";
	
    // Data for Bar Chart
    const data = useData(csvUrl)
    
	if (!data) {
		return <pre>Loading...</pre>;
	}

    const xValue = d => d.timestamp;
	const xAxisLabel = 'Time'

    const yValue = d => d.temperature; //Functions to convert data into only Country data
	const yAxisLabel = "Temperature"

	// Setting Up Bar Chart
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

    const xAxisTickFormat = timeFormat("%a")

	const xScale = scaleTime()
		.domain(extent(data, xValue)) //[min(data, xValue), max(data, xValue)]
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear() // invokes scaleband constructor that creates a new band scale LOL
		.domain(extent(data, yValue))
		.range([innerHeight,0]) //takes the min and max of the areas of the chart
		.nice();

	console.log(xScale.ticks())	
	return (
		<>
			<h1> Line Chart </h1>

			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}> 
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset = {5}/>
					<text 
                        className="axis-label"
                        textAnchor='middle'
						transform={`translate(${-yAxisLabelOffset},${innerHeight/2}) rotate(270)`}
						>
							{yAxisLabel}
					</text>
					
                    <AxisLeft yScale={yScale} innerWidth={innerWidth}  tickOffset = {5}/>
                    <text 
                        className="axis-label"
                        x={innerWidth/2} 
                        textAnchor='middle'
                        y={innerHeight+xAxisLabelOffset}>{xAxisLabel}
					</text>
					<Marks
						data = {data} 
						xScale={xScale} 
						yScale={yScale} 
						xValue={xValue} 
						yValue={yValue} 
						toolTipFormat={xAxisTickFormat} 
						circleRadius={2}
					/>
				</g>
			</svg>
		</>
	);
};

export default ScatterPlot;
