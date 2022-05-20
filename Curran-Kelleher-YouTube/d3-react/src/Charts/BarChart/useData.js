import React, { useEffect, useState } from 'react';
import { csv } from 'd3'

const csvUrl =
	"https://gist.githubusercontent.com/coltenappleby/dff3bf4bd88fe6af992fc18408d91aeb/raw/c691db388bea061c48757bb785b6c8e3f611a4a7/UN_Pop_2019.csv";

export const useData = ( url = csvUrl ) => {

    const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d.Population = +d["2020"] *1000; // + is unary plus which is similar to parseFloat aka String to Number
			return d;
		};
		csv(url, row).then((data) => {
			setData(data.slice(0, 10));
		});
	}, []);
    
    return data
};




