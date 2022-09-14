document.addEventListener('DOMContentLoaded', function(){
    
    // Steps
    // 1. Load Data
    // 2. Calculate Chart
    // 3. Chart away

    // Loading Data

    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

    // Size of plot
    const w = 1000
    const h = 1000

    d3.json(url)
        .then((rawData) => {

            const data = rawData.data.map((event)=>{
                const date = new Date(event[0])
                const year = event[0].substring(0,4)
                let q
                if(event[0].substring(5,6) ==  '01'){
                    q = 'Q1'
                } else if(event[0].substring(5,6) ==  '04'){
                    q = 'Q2'
                } else if(event[0].substring(5,6) ==  '07'){
                    q = 'Q3'
                } else {
                    q = 'Q4'
                }

                return [date, `${year}-${q}`, event[1]]

            })
        

            // Scales
            
            // const xScale = d3.scaleOrdinal()
            //     .domain([d3.min(data.data, d=> d[0]), d3.max(data.data, d=>d[0])])
            //     .range([0, w])
        })
            
    
    
  });