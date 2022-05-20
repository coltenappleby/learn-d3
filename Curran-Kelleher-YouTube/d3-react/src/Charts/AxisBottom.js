import './Chart.css'

export const AxisBottom = ( { xScale, innerHeight, tickFormat } ) => 
    xScale.ticks().map(tickValue => (
        <g className="tick" transform={`translate(${xScale(tickValue)},0)`} key={tickValue}>
            <line 
                // x1={0}
                // y1={0} 
                // x2={0}
                y2={innerHeight}
            />
            <text 
                style={{textAnchor: 'middle'}} 
                dy=".71em"
                y={innerHeight + 3} > 
                    {tickFormat(tickValue)}
            </text>
        </g>
    ))