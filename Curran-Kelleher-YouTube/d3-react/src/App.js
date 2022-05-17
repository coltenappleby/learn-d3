import "./App.css";
import React, { useEffect, useState, useCallBack } from "react";
import * as d3 from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/coltenappleby/bf283f12acc2bbb2ddc83ecf7b07441b/raw/colors.csv";
const width = 960;
const height = 500;

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return data.map((d) => (
    <div 
      style={{
        backgroundColor: d["Hex"],
        width: "100px",
        height: "1px",
      }}>
    </div>
  ));
};

export default App;
