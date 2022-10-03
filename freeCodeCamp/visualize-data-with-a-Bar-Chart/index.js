document.addEventListener('DOMContentLoaded', function(){
    
    // Steps
    // 1. Load Data
    // 2. Calculate Chart
    // 3. Chart away

    // Loading Data

    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

    // Size of plot
    const w = 1000
    const h = 600
    const margin = {"top": 25, "right": 25, "bottom": 25, "left": 39}
    const barWidth = 1
    
    const innerWidth = w - margin.left - margin.right
    const innerHeight = h - margin.top - margin.bottom

    // the SVG

    const svg = d3.select(".chart")
        .append("svg")
        .attr("height", h)
        .attr("width", w)

    // Tooltip
    let tooltip = d3.select(".chart")
        .append("div")
        .attr('id', 'tooltip')
        .style("opacity", 0)
        .style("background-color", "red")
        // .style("border", "solid")
        // .style("border-width", "2px")
        // .style("border-radius", "5px")
        .style("padding", "5px")   


    d3.json(url)
        .then((rawData) => {

            const data = rawData.data.map((event)=>{
                const date = new Date(event[0])
                const year = event[0].substring(0,4)
                let q
                // console.log(event[0].substring(5,6))
                if(event[0].substring(5,7) ==  '01'){
                    q = 'Q1'
                } else if(event[0].substring(5,7) ==  '04'){
                    q = 'Q2'
                } else if(event[0].substring(5,7) ==  '07'){
                    q = 'Q3'
                } else {
                    q = 'Q4'
                }

                //this should probs be an object
                return [
                    date, // Date in JS Date Format
                    `${year}-${q}`, // Date in human readable format
                    event[1] // GDP for that quarter - No Edits 
                ] 

            })
            
        
            // Scales
            const xScale = d3.scaleTime()
                .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
                .range([0, innerWidth])

            const yAxisScale = d3.scaleLinear()
                .domain([d3.min(data, d=>d[2]), d3.max(data, d=>d[2])])
                .range([innerHeight, 0])

            const yScale = d3.scaleLinear()
                .domain([d3.min(data, d=>d[2]), d3.max(data, d=>d[2])])
                .range([0, innerHeight])

            // Need to add User Story #3

            // Axis
            const bottomAxis = svg.append("g")
                .attr("id", "x-axis")
                .attr("transform", `translate(${margin.left}, ${h-margin.bottom})`)
                .call(d3.axisBottom(xScale.nice()))

            const leftAxis = svg.append("g")
                .attr("id", "y-axis")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .call(d3.axisLeft(yAxisScale.nice()))

            data.forEach((d) => {})            

            // The Bars
            const bars = svg.selectAll("bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("y", d => h-margin.bottom-yScale(d[2])) 
                .attr("x", d => xScale(d[0])+14)
                .attr("height", d => yScale(d[2]))
                .attr("width", w/data.length-barWidth)
                .attr("class", "bar")
                // Attributes specified in User Story #7 & #8
                .attr("data-date", d => d[1])
                .attr("data-gdp", d => d[2])
                // tooltip
                // .on("mouseover", (e,d) => console.log(d))
                .on("mouseover", (e,d) => {
                    console.log(d)
                    tooltip
                        .html(`<br> ${d[1]} </br>`)
                        .style("opacity", 1)
                        // .style("left",  xScale(d[0])+14 + "px")
                        .style("left",  100 + "px")
                        .style("top", 1000 + "px")
                })

        })
            
    
    
  });