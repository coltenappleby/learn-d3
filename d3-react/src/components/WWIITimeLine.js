import React, { useEffect, useState } from 'react';
import { scaleTime } from 'd3';

import timeJson from '../data/wwii-timelines.json'

const months = {
    "January" : 1,
    "February" :2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
}

const WWIITimeLine = () => {

    const [ data, setData ] = useState([])

    useEffect(() => {
        const tempData = timeJson.map(event => {
            return {
                    date: `${event.Year}-${months[event.Month]}-${event.Day}`,
                    dateTime: new Date(`${event.Year}-${months[event.Month]}-${event.Day}`),
                    event: event.Text
                }
        })
        setData(tempData)
    }, [timeJson])

    if (!data) {
		return <pre>Loading...</pre>;
	}

    console.log(data[0])

    const axis = scaleTime()
                    .domain([data[0].dateTime, data[79].dateTime])

    return (
        <>
            <h1> Timeline goes here</h1>
            <svg>
                <g>
                    

                </g>
            </svg>
        </>
    )
}


export default WWIITimeLine;