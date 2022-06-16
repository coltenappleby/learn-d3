import React, { useEffect, useState } from 'react';
import { scaleLinear } from 'd3';

import RRTimeline from '../data/RomanRepublicData.json'

const height = 1000;
const width = 1000;
const margin = {top: 20, left: 20, bottom: 25, right: 25}

const RomanRepublicTimeline = () => {

    // console.log(RRTimeline)

    const [ timeLine, setTimeLine ] = useState(null);

    useEffect(() => {
        setTimeLine(RRTimeline)
    }, [])

    if(!timeLine) {
        return(
            <p>Loading...</p>
        )
    }

    const yScale = scaleLinear()
        .domain([timeLine[0].Date, timeLine[timeLine.length -1].Date]) // unit: km
        .range([0, 600]) // unit: pixels

    const Points = () => 
        yScale.ticks(timeLine.length).map(tickValue => (
            <circle r={5} cx={width/2} cy={yScale(tickValue)} fill='blue' />
        ))   
    console.log(timeLine[0].Date)
    console.log(yScale.ticks(timeLine.length))

    return (
        <>
            <h1> Roman Republic Time Line</h1>

            <svg height={height} width={width}>
                <g transform={`translate(${margin.right}, ${margin.top})`}>
                    <line x1={width/2} x2={width/2} y2={height-margin.bottom} stroke='black'/> 
                    <Points/>             
                </g>
                
            </svg>
        </>
    )
}

export default RomanRepublicTimeline;