document.addEventListener('DOMContentLoaded', function(){
    
    // Steps
    // 1. Load Data
    // 2. Calculate Chart
    // 3. Chart away

    // Loading Data

    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

    let rawData;

    fetch(url)
        .then((response) => response.json())
        .then((data) => rawData = JSON.stringify(data))
        .then(() => console.log(rawData))
        .then(() => {

            
            
            
            const data = rawData.data
            console.log(data)
            // Size of plot
            const w = 1000
            const h = 1000
            
            // Scales
            
            // const xScale = d3.scaleLinear()
            //                 .domain()
            //                 .range()
        })
    
  });