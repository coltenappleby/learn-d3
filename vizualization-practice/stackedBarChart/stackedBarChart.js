document.addEventListener('DOMContentLoaded', function(){

    // Create the Data
    // function generateData(weeks) {
    //     const data = [];
      
    //     for (let week = 0; week < weeks; week++) {
    //       const weekStart = new Date(2023, 0, (week + 1)*7);

    //       const countA = Math.floor(Math.random() * 10 + 1);
    //       const countB = Math.floor(Math.random() * 10 + 1);
    //       data.push({
    //         date: weekStart.toISOString().split("T")[0],
    //         type: 'A',
    //         count: countA
    //       });
    //       data.push({
    //         date: weekStart.toISOString().split("T")[0],
    //         type: 'B',
    //         count: countB,
    //       });
    //     }
      
    //     return data;
    // }
    // const data = generateData(30);
    // Save to Github Gist: 
    const url = 'https://gist.githubusercontent.com/coltenappleby/706e93cc2a8ae56372e006871e26ca97/raw/1f34466dc39128f5db0acac8487cc870c3e3f321/count.json'

    // {
    //     "date": "2023-01-07",
    //     "type": "A",
    //     "count": 2
    // }

    d3.json(url).then((data) => {
        console.log(data)
      
        // Size of plot
        const width = 1000
        const height = 800
        const margin = {"top": 30, "right": 50, "bottom": 40, "left": 50}

        const svg = d3
            .select(".chart-container")
            .append("svg")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right)

        const container = svg
            .append("g")
            .classed("container", true)
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Create the correct Data Structure //

        const maxY = () => {
            const maxCount = d3.max(data, d => d.count);
            const maxWeek = data.filter(d=> d.count === maxCount)[0].date;
            const maxWeekData = data.filter(d => d.date === maxWeek);
            let sum = 0;
            maxWeekData.forEach(week => {
                sum += week.count;
            });
            return sum < 10 ? 10 : sum % 5 === 0 ? sum : sum + (5 - sum % 5);
        }


        // const xScale = d3.scaleTime()
        //  .domain([minTime, maxTime])
        //  .range([0, width])

        const groupA = data.filter(d => d.type === "A")
        const groupB = data.filter(d => d.type === "B")

        const xScale = d3.scaleBand()
            .domain(data.map(d => d["date"]))
            .range([0, width])

        const yScale = d3.scaleLinear()
            .domain([0, maxY()])
            .range([height, 0])
            .nice()

        const color = d3.scaleOrdinal()
            .domain(["A", "B"])
            .range(["#E4BA14","#45818e"]);

        // const formatTime = d3.timeFormat("%Y-%m-%d");

        const xAxis = container.append("g")
            .attr("id", "x-axis")
            .attr('transform', `translate(${0}, ${height})`)
            .call(d3.axisBottom(xScale))

        container.append("g")
            .attr("id", "y-axis")
            .attr('transform', `translate(${0}, ${0})`)
            .call(d3.axisLeft(yScale))

        // // Bind the data to the SVG elements
        container.selectAll('g#green-rects')
        .append('g')
        .attr('className', 'green-bars')
            .data(groupA)
            .enter()
            .append('rect')
                .attr('className', 'green-bar')
                .attr('x', d => xScale(d.date))
                .attr('y', d =>  yScale(d.count))
                .attr('width', xScale.bandwidth())
                .attr('height', d => height - yScale(d.count))
                .attr('fill', 'green')
                .attr('count', d => d.count)
                .attr('date', d => d.date)

        container.selectAll('g#red-rects')
            .append('g')
            .attr('class', 'red-rects')
            .data(groupB)
            .enter()
            .append('rect')
                .attr('className', 'red-bar')
                .attr('x', d => xScale(d.date))
                .attr('y', d => yScale(groupA.filter(e => e.date == d.date)[0].count) - Math.abs(yScale(d.count) - yScale(groupA.filter(e => e.date == d.date)[0].count)))
                .attr('width', xScale.bandwidth())
                .attr('height', d => Math.abs(yScale(d.count) - yScale(groupA.filter(e => e.date == d.date)[0].count))-5)
                .attr('fill', 'red')
                .attr('count', d => d.count)
                .attr('date', d => d.date)



    })
})



// const times = Array.from(new Set(data.map(d => d["weekStart"]))).sort(d3.ascending);

// // Map of Week -> Type -> Count
// const dataMap = d3.rollup(
//     data,
//     v => d3.sum(v, d => d["weeklyCount"]),
//     d => d["weekStart"],
//     d => d["type"]
// ); 

// console.log(dataMap)

// // convert dataMap to array of objects in this format:
// // {weekStart: "2023-06-01", "Positive": 1, "Negative": 0}
// const dataArr = times.map(weekStart => { 
// const obj = {weekStart}
// const types = dataMap.get(weekStart)
// if (types) {
//     types.forEach((count, type) => {
//     obj[type] = count
//     })
// }
// return obj
// })

// const stackedData = d3.stack()
//     .keys(["Late to Need", "On-Track"])
//     .value((d, key) => d[key] || 0)
// (dataArr)