import "./App.css";
import React from "react";
import PieChart from './Charts/PieChart';
import BarChart from "./Charts/BarChart/BarChart.js";
import BarChartGanttTest from "./Charts/BarChart/BarChartGanttTest.js";
import ScatterPlot from './Charts/ScatterPlot/ScatterPlot.js'

const App = () => {

  return (
    <>
      <ScatterPlot/>
      <BarChart/>
      <BarChartGanttTest />`
      <PieChart/>
    </>
  )
  
};

export default App;
