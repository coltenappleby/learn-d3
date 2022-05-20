import "./App.css";
import React from "react";
import PieChart from './Charts/PieChart';
import BarChart from "./Charts/BarChart";
import BarChartGanttTest from "./Charts/BarChartGanttTest";

const App = () => {

  return (
    <>
      {/* <BarChartGanttTest /> */}
      <BarChart/>
      {/* <PieChart/> */}
    </>
  )
  
};

export default App;
