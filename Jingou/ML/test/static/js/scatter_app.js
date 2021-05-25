var svgWidth = 660;
var svgHeight = 450;

var margin = {
    top: 20,
    right: 40,
    bottom: 50,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var r;
var chosenXAxis = "acousticness";
var chosenYAxis = "acousticness";


function xScale(data, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) ,
        d3.max(data, d => d[chosenXAxis])
      ])
      .range([0, width]);
  
    return xLinearScale;
}

function yScale(data, chosenYAxis) {
  var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenYAxis]) ,
      d3.max(data, d => d[chosenYAxis]) 
      ])
      .range([height, 0]);

  return yLinearScale;
}

function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}
  
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
  
    return yAxis;
}

function renderXCircles(circlesGroup, newXScale, chosenXAxis, r) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .style("fill",ChooseColor(r["correlationCoefficient"]));
    return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, chosenYAxis, r) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]))
    .style("fill",ChooseColor(r["correlationCoefficient"]));

  return circlesGroup;
}

function renderXCircleText(textCircles, newXScale, chosenXAxis) {

    textCircles.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]));
  
    return textCircles;
  }
  
function renderYCircleText(textCircles, newYScale, chosenYAxis) {
  
    textCircles.transition()
        .duration(1000)
        .attr("y", d => newYScale(d[chosenYAxis]));
  
    return textCircles;
}


function precise(x) {
  return Number.parseFloat(x).toPrecision(3);
}


function ChooseColor(attribute){
  if (attribute > 0.9) {
    return "#006837"
  }
  else if (attribute >= 0.7){
    return "#1a9850"
  }
  else if (attribute >= 0.5){
    return "#66bd63"
  }
  else if (attribute >= 0.3){
    return "#a6d96a"
  }
  else if (attribute >= 0){
    return "#d9ef8b"
  }
  else if (attribute >= -0.3){
    return "#fee08b"
  }
  else if (attribute >= -0.5){
    return "#fdae61"
  }
  else if (attribute >= -0.7){
    return "#f46d43"
  }
  else if (attribute >= -0.9){
    return "#d73027"
  }
  else {
    return "#a50026"
  }
}

// var array = [-0.9, -0.7, -0.5, -0.3, 0, 0.3, 0.5, 0.7, 0.9]


// ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]


function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
  
  // if (chosenXAxis === “poverty”) {
  //   xlabel = “Poverty (%)“;
  // }
  // else if (chosenXAxis === “age”) {
  //   xlabel = “Age (Median)“;
  // }
  // else {
  //   xlabel = “Household Income (Median)”
  // }
  // if (chosenYAxis === “healthcare”) {
  //   ylabel = “Lack of Healthcare (%)“;
  // }
  // else if (chosenYAxis === “smokes”) {
  //   ylabel = “Smokes (%)“;
  // }
  // else {
  //   ylabel = “Obese (%)”
  // }
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    // return (`${d.genres}<br>${xxlabel}: ${d[chosenXAxis]}<br>${yylabel}: ${d[chosenYAxis]}`);
    return (`<strong>${d.genres}</strong><br>${chosenYAxis}: ${precise(d[chosenYAxis])}<br>${chosenXAxis}: ${precise(d[chosenXAxis])}`);
  });
  circlesGroup.call(toolTip);
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this)
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });
  
   
  return circlesGroup;
}


/////////////////////////////////////////////////////////////////
url = 'https://zmyd1nzqug.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/top_51_genres'
d3.json(url).then(function(data, err) {
    if (err) throw err;
  
    // parse data
    data.forEach(function(D) {
        D.energy = +D.energy;
        D.acousticness = +D.acousticness;
        D.duration_ms = +D.duration_ms/60000;
        D.loudness = +D.loudness;
        D.danceability = +D.danceability;
        D.instrumentalness = +D.instrumentalness;
        D.tempo = +D.tempo;
        D.liveness = +D.liveness;
        D.speechiness = +D.speechiness;
        D.valence = +D.valence;
    });


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

    var stats = new Statistics(data, metrics);

    r = stats.correlationCoefficient(chosenXAxis, chosenYAxis);

    // console.log(r['correlationCoefficient'])
    CoefficientLabel = xlabelsGroup
    // correlationCoefficient.text("Correlation Coefficient: " + `${precise(r["correlationCoefficient"])}`)

    var xLinearScale = xScale(data, chosenXAxis);
  
    // Create y 
    var yLinearScale = yScale(data, chosenYAxis);
      
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);
    
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 7)
    .style("fill", ChooseColor(r["correlationCoefficient"]))
    .style("stroke","black")
    .style("opacity", 0.85)
    .classed("stateCircle", true);

     // Made to initiate tooltip when page first loads
     textCircles = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // var textCircles = chartGroup.append("g")
    // .selectAll("text")
    // .data(data)
    // .enter()
    // .append("text")
    // .text(d => d.genres)
    // .attr("x", d => xLinearScale(d[chosenXAxis]))
    // .attr("y", d => yLinearScale(d[chosenYAxis]))
    // .classed("stateText", true)

    var xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    // var XLabel = xlabelsGroup.append("text")
    // .attr("x", 0)
    // .attr("y", 20)
    // .classed("active", true)
    // .text("Choose one factor you want to conpare :");

    var  CoefficientLabel = xlabelsGroup.append("text")
    .attr("x", -250)
    .attr("y", 30)
    .classed("active", true)
    .text("Correlation Coefficient: "+ `${precise(r["correlationCoefficient"])}`);

   
    //////////////////////////////////////////////////////////////
    
    d3.selectAll("#Xselect").on("change", updateX)
      
    function updateX(){
      // chosenXAxis = value;
      
      // xAxis = renderXAxes(xLinearScale, xAxis);
      
      var dropdownMenu = d3.select("#Xselect");
      chosenXAxis = dropdownMenu.property("value");
      xLinearScale = xScale(data, chosenXAxis);
      xAxis = renderXAxes(xLinearScale, xAxis);
      
      // console.log(chosenXAxis)
      // console.log(chosenYAxis)
      r = stats.correlationCoefficient(chosenXAxis, chosenYAxis);

      circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis, r);
      // textCircles = renderXCircleText(textCircles, xLinearScale, chosenXAxis);
      CoefficientLabel.text("Correlation Coefficient: " + `${precise(r["correlationCoefficient"])}`);
      textCircles = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
      
      // console.log("hello from update")
      // console.log(data[chosenXAxis])
      // console.log(xLinearScale)



     

    }

    // updateX(circlesGroup, textCircles, chosenXAxis)

    d3.selectAll("#Yselect").on("change", updateY)

    function updateY(){
      var dropdownMenu = d3.select("#Yselect");
      
      chosenYAxis = dropdownMenu.property("value");
      yLinearScale = yScale(data, chosenYAxis);
      yAxis = renderYAxes(yLinearScale, yAxis);

      r = stats.correlationCoefficient(chosenXAxis, chosenYAxis);
      circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis, r);
      // textCircles = renderYCircleText(textCircles, yLinearScale, chosenYAxis);
      CoefficientLabel.text("Correlation Coefficient: " + `${precise(r["correlationCoefficient"])}`);
      textCircles = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup)
      
      
      
      
    }



 
  }).catch(function(error) {
    console.log(error);
  });
