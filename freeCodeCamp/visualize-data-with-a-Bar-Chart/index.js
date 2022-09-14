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
    const margin = {"top": 25, "right": 25, "bottom": 25, "left": 25}

    const innerWidth = w - margin.left - margin.right
    const innerHeight = w - margin.top - margin.bottom

    // the svg

    const svg = d3.select(".chart")
                    .append("svg")
                    .attr("height", h)
                    .attr("width", w)

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
            
            const xScale = d3.scaleTime()
                .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
                .range([0, innerWidth])
            const barWidth = xScale(data[1][0])

            const yScale = d3.scaleLinear()
                .domain([d3.min(data, d=>d[2]), d3.max(data, d=>d[2])])
                .range([innerHeight, 0])

            console.log(yScale(data[data.length-1][2]))
            
            const bottomAxis = svg.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left+14}, ${h-margin.bottom})`)
                .call(d3.axisBottom(xScale.nice()))
                
            const leftAxis = svg.append("g")
                .attr("class", "axis")
                .attr("transform", `translate(${margin.left+14}, ${margin.top})`)
                .call(d3.axisLeft(yScale.nice()))
        })
            
    
    
  });