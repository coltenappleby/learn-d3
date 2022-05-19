import React, { useState, useEffect } from "react";
import { csv, scaleBand, scaleLinear, max, tickStep } from "d3";

const csvUrl =
	"https://gist.githubusercontent.com/coltenappleby/dff3bf4bd88fe6af992fc18408d91aeb/raw/c691db388bea061c48757bb785b6c8e3f611a4a7/UN_Pop_2019.csv";

const width = 960;
const height = 500;
const margin = { top: 200, right: 20, bottom: 20, left: 20 };

const BarChart = ({ width = 960, height = 500 }) => {
	// Data for Bar Chart

	const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d.Population = +d["2020"]; // + is unary plus which is similar to parseFloat aka String to Number
			return d;
		};
		csv(csvUrl, row).then((data) => {
			setData(data.slice(0, 10));
		});
	}, []);

	if (!data) {
		return <pre>Loading...</pre>;
	}

	// Setting Up Bar Chart

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yScale = scaleBand() // invokes scaleband constructor that creates a new band scale LOL
		.domain(data.map((d) => d.Country)) //setting the domain to the country
		.range([0, innerHeight]); //takes the min and max of the areas of the chart

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => d.Population)])
		.range([0, innerWidth]);

	return (
		<>
			<h1> Bar Chart </h1>

			<svg width={width} height={height}>
				<g transform={`translate(${margin.top},${margin.left})`}> 
                {/* Population totals on the bottom */}
                    {xScale.ticks().map(tickValue => (
                        <g transform={`translate(${xScale(tickValue)},0)`} key={tickValue}>
                            <line 
                                // x1={0}
                                // y1={0} 
                                // x2={0}
                                y2={innerHeight}
                                stroke="black"
                            />
                            <text 
                                style={{textAnchor: 'middle'}} 
                                dy=".71em"
                                y={innerHeight + 3} > 
                                    {tickValue}
                            </text>
                        </g>
                    ))}

                    {yScale.domain().map(tickValue => ( //country names
                            <text 
                                style={{textAnchor: "end"}} 
                                dy=".32em" 
                                x={-3} 
                                y={yScale(tickValue) + yScale.bandwidth()/2} 
                                key={tickValue}> 
                                    {tickValue}
                            </text>
                    ))}

					{data.map((d) => (
                        <g>
                            <rect
                                x={0}
                                y={yScale(d.Country)}
                                width={xScale(d.Population)}
                                height={yScale.bandwidth()}
                                key={d.Country}
                                // fill="white"
                            >
                            </rect>
                            <text 
                                y={yScale(d.Country) + yScale.bandwidth()/2+7}
                                x={xScale(d.Population)}
                                style={{textAnchor: "end"}} 
                                fill="white" >
                                    {d.Population}
                            </text>
                        </g>
					))}
				</g>
			</svg>
		</>
	);
};

export default BarChart;
