import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { scaleLinear, extent, tickStep, format } from "d3";
import { useDataSP } from './useDataSP.js'
import { AxisBottomSP } from './AxisBottomSP.js';
import { AxisLeftSP } from './AxisLeftSP.js';
import { MarksSP } from './MarksSP.js';


const width = 960;
const height = 500;
const margin = { top: 15, right: 20, bottom: 55, left: 100 }
const xAxisLabelOffset = 45
const yAxisLabelOffset = 45

const ScatterPlot = ({ width = 960, height = 500 }) => {
	const csvUrl =
		"https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
	
    // Data for Bar Chart
    const data = useDataSP(csvUrl)
    
	if (!data) {
		return <pre>Loading...</pre>;
	}

    const xValue = d => d.petal_length;
	const xAxisLabel = 'Petal Length'

    const yValue = d => d.sepal_width; //Functions to convert data into only Country data
	const yAxisLabel = "Sepal Width"

	// Setting Up Bar Chart
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;


    const siFormat = format('.2s') //split out so that we aren't creating the format function each time
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G','B')

	const xScale = scaleLinear()
		.domain(extent(data, xValue)) //[min(data, xValue), max(data, xValue)]
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear() // invokes scaleband constructor that creates a new band scale LOL
		.domain(extent(data, yValue))
		.range([0, innerHeight]) //takes the min and max of the areas of the chart
		.nice();

	return (
		<>
			<h1> Scatter Chart </h1>

			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}> 
                    <AxisBottomSP xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset = {5}/>
					<text 
                        className="axis-label"
                        textAnchor='middle'
						transform={`translate(${-yAxisLabelOffset},${innerHeight/2}) rotate(270)`}
						>
							{yAxisLabel}
					</text>
					
                    <AxisLeftSP yScale={yScale} innerWidth={innerWidth}  tickOffset = {5}/>
                    <text 
                        className="axis-label"
                        x={innerWidth/2} 
                        textAnchor='middle'
                        y={innerHeight+xAxisLabelOffset}>{xAxisLabel}
					</text>
					<MarksSP 
						data = {data} 
						xScale={xScale} 
						yScale={yScale} 
						xValue={xValue} 
						yValue={yValue} 
						toolTipFormat={xAxisTickFormat} 
						circleRadius={5}
					/>
				</g>
			</svg>
		</>
	);
};

export default ScatterPlot;
