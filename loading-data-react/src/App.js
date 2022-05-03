import './App.css';

import React, { useState } from 'react'
import * as d3 from 'd3'

const csvUrl = 'https://gist.githubusercontent.com/coltenappleby/bf283f12acc2bbb2ddc83ecf7b07441b/raw/colors.csv'
const width = 960;
const height = 500;

const message = data => {
  let message = '';
  message = message + data.length + ' rows\n';
  message = message + data.columns.length + ' columns';
  // message = message + d3.csvFormat(data).length /1024 + ' kB';
  return message;
}


const App = () => {
  const [data, setData] = useState(null)

  d3.csv(csvUrl).then(data => {
    setData(data)
  })


  return(
    <>
      <div> Data is : { data ? message(data) : " not loaded"} </div>
    </>
  )
}

export default App;
