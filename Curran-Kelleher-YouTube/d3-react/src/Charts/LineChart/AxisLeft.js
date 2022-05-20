import '../Chart.css'

export const AxisLeft = ({ yScale, innerWidth,  tickOffset = 3 }) =>
	yScale.ticks().map(( tickValue ) => (   //country names
        <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text
                key={tickValue}  
                style={{ textAnchor: "end" }}
                dy=".32em"
                x={-tickOffset}
            >
                {tickValue}
            </text>
        </g>
		)
	);
