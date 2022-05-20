import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { csv, scaleBand, scaleLinear, max, tickStep, format } from "d3";
import { useData } from './useData.js'
import { AxisBottom } from './AxisBottom.js';
import { AxisLeft } from './AxisLeft.js';
import { Marks } from './Marks.js';

const csvUrl =
	"https://gist.githubusercontent.com/coltenappleby/dff3bf4bd88fe6af992fc18408d91aeb/raw/c691db388bea061c48757bb785b6c8e3f611a4a7/UN_Pop_2019.csv";

const width = 960;
const height = 500;
const margin = { top: 15, right: 20, bottom: 55, left: 240 }
const xAxisLabelOffsett = 45

const BarChart = ({ width = 960, height = 500 }) => {
	
    // Data for Bar Chart
    const data = useData(csvUrl)
    
	if (!data) {
		return <pre>Loading...</pre>;
	}

    const yValue = d => d.Country; //Functions to convert data into only Country data
    const xValue = d => d.Population;


	// Setting Up Bar Chart
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;


    const siFormat = format('.2s')
    const xAxisTickFormat = n => siFormat(n).replace('G','B')

	const yScale = scaleBand() // invokes scaleband constructor that creates a new band scale LOL
		.domain(data.map(yValue)) //setting the domain to the country
		.range([0, innerHeight]) //takes the min and max of the areas of the chart
        .padding(0.1);

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0, innerWidth]);

	return (
		<>
			<h1> Bar Chart </h1>

			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}> 
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
                    <AxisLeft yScale={yScale} />
                    <text 
                        className="axis-label"
                        x={innerWidth/2} 
                        textAnchor='middle'
                        y={innerHeight+xAxisLabelOffsett}>Population</text>
                    <Marks data = {data} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue}/>
				</g>
			</svg>
		</>
	);
};

export default BarChart;
