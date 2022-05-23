import "./App.css";
import React from "react";
import PieChart from './Charts/PieChart';
import BarChart from "./Charts/BarChart/BarChart.js";
import BarChartGanttTest from "./Charts/BarChart/BarChartGanttTest.js";
import ScatterPlot from './Charts/ScatterPlot/ScatterPlot.js';
import LineChart from './Charts/LineChart/LineChart.js';
import WorldMap from "./Charts/WorldMap/WorldMap";

const App = () => {

  return (
    <>
      <WorldMap/>
      {/* <LineChart/> */}
      {/* <ScatterPlot/> */}
      {/* <BarChart/> */}
      {/* <BarChartGanttTest />` */}
      {/* <PieChart/> */}
    </>
  )
  
};

export default App;
