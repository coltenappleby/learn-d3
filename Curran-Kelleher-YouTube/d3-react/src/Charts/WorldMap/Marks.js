import { geoPath, geoEqualEarth } from 'd3';
import './WorldMap.css'

const projection = geoEqualEarth()
const path = geoPath(projection)

export const Marks = ( { data: {countries, interiors} } ) => (
    <g className='marks' >
        <path className='sphere' d={path({ type: 'Sphere' })} />
        {countries.features.map((feature) => (
            <path
                className='countries'
                d={path(feature)}
            />        
        ))}
        <path className='interiors' d={path({interiors})} />

    </g>
)