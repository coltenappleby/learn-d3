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

    // the SVG

    const svg = d3.select(".chart")
                    .append("svg")
                    .attr("height", h)
                    .attr("width", w)

    const plot = svg.append("div")
                    .attr("x", margin.left)
                    .attr("y", height-margin.top)
                    .attr("height", innerHeight)
                    .attr("width", innerWidth)

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

            
            // Need to add User Story #3

            // Axis
            const bottomAxis = svg.append("g")
                .attr("id", "x-axis")
                // .attr("transform", `translate(${margin.left+14}, ${innerHeight+margin.top})`)
                .attr("transform", `translate(${0}, ${innerHeight})`) // with plot
                .call(d3.axisBottom(xScale.nice()))
                
            const leftAxis = svg.append("g")
                .attr("id", "y-axis")
                // .attr("transform", `translate(${margin.left+14}, ${margin.top})`)
                .attr("transform", `translate(${14}, ${0})`) // with plot
                .call(d3.axisLeft(yScale.nice()))

            data.forEach((d) => {})

            // The Bars
            const bars = svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d[0]))
                .attr("y", d => {innerHeight-yScale(d[2])}) 
                .attr("height", d => yScale(d[2]))
                .attr("width", barWidth)
                .attr("class", "bar")
        })
            
    
    
  });