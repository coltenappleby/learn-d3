import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
// import { scaleLinear, scaleTime, extent, tickStep, timeFormat } from "d3";
import { useData } from './useData.js'
import { Marks } from './Marks.js';


const width = 960;
const height = 500;

const WorldMap = ({ width = 960, height = 500 }) => {
	const csvUrl =
		"https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
	
    // Data for Bar Chart
    const data = useData(csvUrl)
    
	if (!data) {
		return <pre>Loading...</pre>;
	}

	return (
		<>
			<h1> World Map </h1>
			<svg width={width} height={height}>
					<Marks
						data = {data} 
					/>
			</svg>
		</>
	);
};

export default WorldMap;
