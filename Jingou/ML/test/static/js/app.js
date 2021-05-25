// Step 1: Set up our chart
//= ================================
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 50,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================

var yearData;
var r;
var chosenLeftyAxis = "acousticness"

var chosenRightyAxis = "acousticness"




  // Step 5: Create Scales
  //= ============================================
//   var xTimeScale = d3.scaleTime()

function xScale(yearData){
var xTimeScale = d3.scaleLinear()
    .domain(d3.extent(yearData, d => d.year))
    .range([0, width]);

    return xTimeScale
}


function LeftyScale(yearData, chosenLeftyAxis){
  var yLinearScale1 = d3.scaleLinear()
    .domain(d3.extent(yearData, d => d[chosenLeftyAxis]))
    .range([height, 0]);

    return yLinearScale1
}





function RightyScale(yearData, chosenRightyAxis){
  var yLinearScale2 = d3.scaleLinear()
    .domain(d3.extent(yearData, d => d[chosenRightyAxis]))
    .range([height, 0]);

    return yLinearScale2
}

// function renderXAxis(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

function renderLeftyAxis(yLinearScale1, LeftyAxis, chosenAxis){
  var leftAxis = d3.axisLeft(yLinearScale1);

  LeftyAxis.transition()
      .duration(1000)
      .style("fill", ChooseColor(chosenAxis))
      .call(leftAxis)

      return LeftyAxis
}

function renderRightyAxis(yLinearScale2, RightyAxis, chosenAxis){
  var rightAxis = d3.axisRight(yLinearScale2);

    RightyAxis.transition()
      .duration(1000)
      .style("fill", ChooseColor(chosenAxis))
      .call(rightAxis)

      return RightyAxis
  
}

function renderline1(line1, xTimeScale, yLinearScale1, chosenLeftyAxis){
var line1 = d3
.line()
.x(d => xTimeScale(d.year))
.y(d => yLinearScale1(d[chosenLeftyAxis]));

return line1
}

function renderline2(line2, xTimeScale, yLinearScale2, chosenRightyAxis){
var line2 = d3
.line()
.x(d => xTimeScale(d.year))
.y(d => yLinearScale2(d[chosenRightyAxis]));

return line2
}



function updateline1Path(LeftLine, line1, chosenAxis){
// Append a path for line1
LeftLine.transition()
.duration(1000)
.attr("stroke", ChooseColor(chosenAxis))
.attr("d", line1)


return LeftLine
}

function updateline2Path(RightLine, line2, chosenAxis){
// Append a path for line2
RightLine.transition()
.duration(1000)
.attr("stroke", ChooseColor(chosenAxis))
.attr("d", line2)


return RightLine
}

function ChooseColor(attribute){
  if (attribute === "acousticness") {
    return "#4E79A7"
  }
  else if (attribute === "danceability"){
    return "#F28E2C"
  }
  else if (attribute === "duration_ms"){
    return "#E15759"
  }
  else if (attribute === "energy"){
    return "#76B7B2"
  }
  else if (attribute === "instrumentalness"){
    return "#59A14F"
  }
  else if (attribute === "liveness"){
    return "#EDC949"
  }
  else if (attribute === "loudness"){
    return "#AF7AA1"
  }
  else if (attribute === "speechiness"){
    return "#FF9DA7"
  }
  else if (attribute === "tempo"){
    return "#9C755F"
  }
  else if (attribute === "valence"){
    return "#BAB0AB"
  
  }

}

function precise(x) {
  return Number.parseFloat(x).toPrecision(3);
}





d3.csv("../../Resources/archive/data_by_year.csv").then(function(yrData, err) {
  if (err) throw err;

  yearData = yrData


  
  
  
    // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  // Create a function to parse date and time


  var parseTime = d3.timeParse("%Y");

  // Format the data
// ACOU = []
// DANC = []
// DURA = []
// ENER = []
// INST = []
// LIVE = []
// LOUD = []
// SPEE = []
// TEMP = []
// VALE = []




  yearData.forEach(function(data) {
    data.year = parseTime(data.year).getFullYear()
    data.acousticness = +data.acousticness;
    data.danceability = +data.danceability;
    data.duration_ms = +data.duration_ms
    data.energy = +data.energy
    data.instrumentalness = +data.instrumentalness
    data.liveness = +data.liveness
    data.loudness= +data.loudness
    data.speechiness = +data.speechiness
    data.tempo = +data.tempo
    data.valence = +data.valence

    // ACOU.push(data.acousticness)
    // DANC.push(data.danceability)
    // DURA.push(data.duration_ms)
    // ENER.push(data.energy)
    // INST.push(data.instrumentalness)
    // LIVE.push(data.liveness)
    // LOUD.push(data.loudness)
    // SPEE.push(data.speechiness)
    // TEMP.push(data.tempo)
    // VALE.push(data.valence)

  });


// console.log(yearData)







  
  var metrics = {
    acousticness: 'metric',
    danceability: 'metric',
    duration_ms: 'metric',
    energy: 'metric',
    instrumentalness: 'metric',
    liveness: 'metric',
    loudness: 'metric',
    speechiness: 'metric',
    tempo: 'metric',
    valence: 'metric',
  };
  
  var stats = new Statistics(yearData, metrics);
 
// console.log(VALE)













 var xTimeScale = xScale(yearData)
 var yLinearScale1 =  LeftyScale(yearData, chosenLeftyAxis)
 var yLinearScale2 = RightyScale(yearData, chosenRightyAxis)

  r = stats.correlationCoefficient('acousticness', 'acousticness');

console.log(r['correlationCoefficient'])

  // Step 6: Create Axes
  // =============================================
//   var bottomAxis = d3.axisBottom(xTimeScale.tickFormat(d3.timeFormat("%d-%b"));)
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.format("d"))
 

  var leftAxis = d3.axisLeft(yLinearScale1);
 
  
 
  
  var rightAxis = d3.axisRight(yLinearScale2);


  // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add bottomAxis
  var xAxis = chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

  // Add leftAxis to the left side of the display
  
  var LeftyAxis = chartGroup.append("g")
  .style("fill", "#4E79A7")
  .call(leftAxis);


  // Add rightAxis to the right side of the display
  var RightyAxis = chartGroup.append("g")
  .attr("transform", `translate(${width}, 0)`)
  .style("fill", "#4E79A7")
  .call(rightAxis);


  // Step 8: Set up two line generators and append two SVG paths
  // ==============================================
  // Line generators for each line
  var line1 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale1(d[chosenLeftyAxis]));

  var line2 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale2(d[chosenRightyAxis]));


  // Append a path for line1
  var LeftLine = chartGroup.append("g")
    .append("path")
    .data([yearData])
    .attr("d", line1)
    // .classed("line green", true)
    .attr("stroke", ChooseColor(chosenLeftyAxis))
        .style("stroke-width", 3)
        .style("fill", "none")

  // Append a path for line2
  var RightLine = chartGroup.append("g")
    .append("path")
    .data([yearData])
    .attr("d", line2)
    .attr("stroke", ChooseColor(chosenRightyAxis))
        .style("stroke-width", 3)
        .style("fill", "none")
        
    // .style("style", "red")


 // creating x-axis labels for clicking
 var xlabelsGroup = chartGroup.append("g")
 .attr("transform", `translate(${width / 2}, ${height + 20})`);

 var YearLabel = xlabelsGroup.append("text")
   .attr("x", -20)
   .attr("y", 25)
   .attr("class", "axisText")
   .attr("value", "poverty") // value to grab for event listener
   
   .text("Year");



   var CoefficientLabel = xlabelsGroup.append("text")
   .attr("x", 120)
   .attr("y", 25)
   .attr("class", "cc")
   .attr("value", "poverty") // value to grab for event listener
   
   .text("Correlation Coefficient: "+ `${precise(r["correlationCoefficient"])}`);
  //  var LeftylabelsGroup = chartGroup.append("g")
  //  .attr("transform", `translate(${0 - margin.left + 10}, ${height/2 -70})`);

  //  var Acousticness = LeftylabelsGroup.append("text")
  // //  .attr("transform", "rotate(-90)")
  //  .attr("x", 0)
  //  .attr("y", 0)
  //  .attr("dy", "1em")
  //  .attr("class", "axisText")
  //  .attr("value", "healthcare") // value to grab for event listener
  //  .classed("active", true)
  //  .text("Acousticness");

  //  var RightylabelsGroup = chartGroup.append("g")
  //  .attr("transform", `translate(${0 + width + 45}, ${height/2 - 70} )`);

  //  var Danceability = RightylabelsGroup.append("text")
  // //  .attr("transform", "rotate(-90)")
  //  .attr("x", 0)
  //  .attr("y", 0)
  //  .attr("dy", "1em")
  //  .attr("class", "axisText")
  //  .attr("value", "healthcare") // value to grab for event listener
  //  .classed("active", true)
  //  .text("Danceability");
  // xlabelsGroup.selectAll("text")
  //   .on("click", function() {

  d3.selectAll("#selDataset1").on("change", updateLeftData)

  // This function is called when a dropdown menu item is selected
function updateLeftData() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset1");
    // Assign the value of the dropdown menu option to a variable
     chosenLeftyAxis = dropdownMenu.property("value");

  console.log(chosenLeftyAxis)
  console.log(chosenRightyAxis)


  r = stats.correlationCoefficient(chosenLeftyAxis, chosenRightyAxis);
  CoefficientLabel.text("Correlation Coefficient: " + `${precise(r["correlationCoefficient"])}`);


    // var xTimeScale = xScale(yearData)
 var yLinearScale1 =  LeftyScale(yearData, chosenLeftyAxis)
//  var yLinearScale2 = RightyScale(yearData, chosenRightyAxis)
   



// Why did deleting the var LeftyAxis = work?
  LeftyAxis = renderLeftyAxis(yLinearScale1, LeftyAxis, chosenLeftyAxis);
    
  line1 = renderline1(line1, xTimeScale, yLinearScale1, chosenLeftyAxis)

  updateline1Path(LeftLine, line1, chosenLeftyAxis)
  
  // var LeftLine = LeftLine
  //  .datum(yearData)
  //  .transition()
  //  .duration(1000)
  //  .attr("d", line1)
  //  .attr("stroke", "line green")

// })
}

d3.selectAll("#selDataset2").on("change", updateRightData)

  // This function is called when a dropdown menu item is selected
function updateRightData() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset2");
    // Assign the value of the dropdown menu option to a variable
     chosenRightyAxis = dropdownMenu.property("value");


     console.log(chosenLeftyAxis)
     console.log(chosenRightyAxis)

  r = stats.correlationCoefficient(chosenLeftyAxis, chosenRightyAxis);

  CoefficientLabel.text("Correlation Coefficient: " + `${precise(r["correlationCoefficient"])}`);

    // var xTimeScale = xScale(yearData)
 var yLinearScale2 =  RightyScale(yearData, chosenRightyAxis)
//  var yLinearScale2 = RightyScale(yearData, chosenRightyAxis)
   


// Why did deleting the var LeftyAxis = work?
  RightyAxis = renderRightyAxis(yLinearScale2, RightyAxis, chosenRightyAxis);
    
  var line2 = renderline2(line2, xTimeScale, yLinearScale2, chosenRightyAxis)

  updateline2Path(RightLine, line2, chosenRightyAxis)
  
  // var LeftLine = LeftLine
  //  .datum(yearData)
  //  .transition()
  //  .duration(1000)
  //  .attr("d", line1)
  //  .attr("stroke", "line green")

// })
}










}).catch(function(error) {
  console.log(error);
});


