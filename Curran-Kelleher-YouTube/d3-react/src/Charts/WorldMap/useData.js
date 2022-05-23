import React, { useEffect, useState } from 'react';
import { json } from 'd3';
import { feature, mesh  } from 'topojson';

export const useData = ( url ) => {

    const [data, setData] = useState(null);
    
	useEffect(() => {
		json(url).then(topology => {
            const { countries } = topology.objects;
            setData({
                countries: feature(topology, countries),
                interiors: mesh(topology, countries, (a,b) => a !== b )   
            })
        });
	}, []);
    
    return data
};




