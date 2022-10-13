document.addEventListener('DOMContentLoaded', function(){
    
    const url = 'https://gist.githubusercontent.com/coltenappleby/38db73519bc9617e1c17f51424404d25/raw/89c58d8dfd90956cf90af03e5c56e653cf3b4cfb/rebel_leaders'

    // import rawData from  data.json

    // Size of plot
    const width = 1000
    const height = 500
    const margin = {"top": 25, "right": 25, "bottom": 25, "left": 40}
    const left = 100;
    const top = 60;

    // Setting up the SVG
    // const svg = d3.select(".container")
    //     .append("svg")
    //     .attr("height", height + top)
    //     .attr("width", width + left)

    // Tooltip
    let tooltip = d3.select(".container")
        .append("div")
        .attr('id', 'tooltip')
        .style("opacity", 0)
        .style("padding", "5px")   


    d3.json(url).then((rawData) => {
        console.log(rawData)

        let tempData = rawData.map((d) => {
            return {
                areaofstudy: d.areaofstudy,
                stname: d.stname,
                cat_areaofstudy1: d.cat_areaofstudy1,
                confdesc: d.confdesc,
                dead: d.dead,
                deathcause: d.deathcause,
                education: d.education,
                fullbirthname: d.fullbirthname,
                gender: d.gender,
                groupname: d.groupname,
                languages: d.languages,
                placeofbirth: d.placeofbirth,
                popularname: d.popularname,
                religion: d.religion,
                studyab_level: d.studyab_level,
                yearofbirth: d.yearofbirth,
                yearofdeath: d.yearofdeath
            }
        })

        let countryOnly = d => d.stname === 'Afghanistan';
        tempData = tempData.filter(countryOnly)
        console.log(tempData)

        data = d3.group(tempData, d => d.stname, d=> d.groupname, d=> d.popularname) //d => d.confdesc
        let nodes = d3.hierarchy(data)
        console.log(nodes)

        const svg = d3.select(".container")
            .append("svg")
            .attr("height", height + top)
            .attr("width", width + left)
        
        // Declares a tree layout and assigns the size
        const treemap = d3.tree().size([height, width]);
        nodes = treemap(nodes);

        console.log(nodes)


        const node = svg.selectAll(".node")
                    .data(nodes.descendants())
                    .enter()
                    .append('g')
                    .attr("class", d => "node" + (d.children ? " node--internal": " node--leaf"))
                    .attr("transform", d => "translate(" + d.y + "," + d.x + ")")

        const link = svg.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .style("stroke", "black")
            .style("stroke-width", .5)
            .attr("d", d=> {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            })


        node.append("circle")
                .attr("r", 4)
                .style("stroke", "black")
                .style("fill", "white")

        node.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children ? (1 + 5) * -1 : 1 + 5)
            .attr("y", -(1 + 5))
            .style("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data[0]);




    })
            
    
    
});