import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { scaleLinear, extent, tickStep, format } from "d3";
import { useDataSP } from './useDataSP.js'
import { AxisBottomSP } from './AxisBottomSP.js';
import { AxisLeftSP } from './AxisLeftSP.js';
import { MarksSP } from './MarksSP.js';
import { Dropdown } from "./Dropdown.js";

const width = 960;
const height = 500;
const margin = { top: 15, right: 20, bottom: 55, left: 100 }
const xAxisLabelOffset = 45
const yAxisLabelOffset = 45

const attributes = [
	{ value: 'sepal_length', label: 'Sepal Length' },
	{ value: 'sepal_width', label: 'Sepal Width' },
	{ value: 'petal_length', label: 'Petal Length' },
	{ value: 'petal_width', label: 'Petal Width' },
	{ value: 'species', label: 'Species' }
  ];

  const getLabel = value => {
	for(let i = 0; i < attributes.length; i++){
		if(attributes[i].value == value){
			return attributes[i].label
		}
	}
}

const ScatterPlot = ({ width = 960, height = 500 }) => {
	const csvUrl =
		"https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
	
    // Data for Bar Chart
    const data = useDataSP(csvUrl)

	const initialXAttribute = 'petal_length'
	const [xAttribute, setXAttribute] = useState(initialXAttribute);
    const xValue = d => d[xAttribute];
	const xAxisLabel = getLabel(xAttribute)
	
	const initialYAttribute = 'sepal_width';
	const [yAttribute, setYAttribute] = useState(initialYAttribute)
	const yValue = d => d[yAttribute]; 
	const yAxisLabel = getLabel(yAttribute)


	if (!data) {
		return <pre>Loading...</pre>;
	}

	// const snakeToCaps = str =>
	// 	str.toLowerCase().replace(/([-_][a-z])/g, group =>
	// 		group
	// 			.replace('-', ' ')
	// 			.replace('_', ' ')
	// 	).toUpperCase()

	// const attributes = data.columns.map(column => {
	// 	return {
	// 		'value': column, 
	// 		'label': snakeToCaps(column)
	// 	}
	// })

	console.log(attributes)


	// Setting Up Bar Chart
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;


	// Formatting of Axis
    const siFormat = format('.2s') //split out so that we aren't creating the format function each time
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G','B')

	// Scaling of Axis
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

			<label for='x-select'> Choose some cool shit: </label>
			<Dropdown options={attributes} id='x-select' selectedValue={xAttribute} onSelectedValueChange={setXAttribute}/>

			<label for='y-select'> Choose some cool shit: </label>
			<Dropdown options={attributes} id='y-select' selectedValue={yAttribute} onSelectedValueChange={setYAttribute}/>

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
