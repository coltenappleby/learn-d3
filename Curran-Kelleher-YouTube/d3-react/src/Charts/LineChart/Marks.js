import { line, curveNatural } from 'd3';
import './LineChart.css'

export const Marks = ( { data, xScale, yScale, xValue, yValue, toolTipFormat, circleRadius=1 } ) => (
    <g className='marks' >
    <path
        fill='none'
        stroke="black"
        d={line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(curveNatural)(data)}
    />
        {data.map((d) => (
            <circle
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={circleRadius}
            >
                <title>{toolTipFormat(xValue(d))}</title>    
            </circle>
        
        ))}
    </g>
)