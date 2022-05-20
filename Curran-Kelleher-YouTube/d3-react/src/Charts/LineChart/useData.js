import React, { useEffect, useState } from 'react';
import { csv } from 'd3'

export const useData = ( url ) => {

    
    const [data, setData] = useState(null);
    
	useEffect(() => {
        const row = (d) => {
            d.temperature = +d.temperature;
            d.timestamp = new Date(d.timestamp)
			return d;
		};
		csv(url, row).then(setData);
	}, []);
    
    // console.log(url)
    // console.log(data)
    return data
};




