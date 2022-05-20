export const MarksSP = ( { data, xScale, yScale, xValue, yValue, toolTipFormat, circleRadius=10 } ) => 
    data.map((d) => (
        <circle
            className='mark'
            // key={yValue(d)}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={circleRadius}
        >
            <title>{toolTipFormat(xValue(d))}</title>    
        </circle>
    
    ))