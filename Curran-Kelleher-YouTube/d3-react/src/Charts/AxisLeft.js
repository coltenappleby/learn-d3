export const AxisLeft = ({ yScale }) =>
	yScale.domain().map(( tickValue ) => (   //country names
        <text
            style={{ textAnchor: "end" }}
            dy=".32em"
            x={-3}
            y={yScale(tickValue) + yScale.bandwidth() / 2}
            key={tickValue}  >
            
            {tickValue}
        </text>
		)
	);
