import logo from './logo.svg';
import './App.css';

const width = 960;
const height = 500;
const centerX = width/2
const centerY = height/2
const strokeWidth = 20
const eyeOffsetX = 90
const eyeOffsetY = 100
const eyeRadius = 50;

function App() {
  return (
    <svg width={width} height={height}>
      <circle
        cx={centerX}
        cy={centerY}
        r={centerY - strokeWidth/2}
        fill="yellow"
        stroke="black"
        stroke-width="10"
      />
      <circle
        cx={centerX - eyeOffsetX}
        cy={centerY - eyeOffsetY}
        r={eyeRadius}
      />
        <circle
          cx={centerX + eyeOffsetX}
          cy={centerY - eyeOffsetY}
          r={eyeRadius}
        />
    </svg>
  );
}

export default App;



<svg width="960" height="500">
<circle
  cx="480"
  cy="250"
  r="245"
  fill="yellow"
  stroke="black"
  stroke-width="10"
>
</circle>
<circle
  cx="350"
  cy="180"
  r="50"
>
</circle>
<circle
  cx="600"
  cy="180"
  r="50"
>
</circle>
</svg>