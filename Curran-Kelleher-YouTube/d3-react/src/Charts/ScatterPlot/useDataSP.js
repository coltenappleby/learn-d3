import React, { useEffect, useState } from 'react';
import { csv } from 'd3'

export const useDataSP = ( url ) => {

    const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
			return d;
		};
		csv(url, row).then(setData);
	}, []);
    
    return data
};




