// Fetch the JSON data and parse it
fetch('assets/tab1_ability/data/3dplot.json').then(response => response.json())
.then(data => {
    // Use Plotly.js to create the graph
    Plotly.newPlot('3d_abi', data.data, data.layout);
});

var modal = document.getElementById("dialog");

document.getElementById("opener").addEventListener("click", function() {
    modal.style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

var modal2 = document.getElementById("dialog2");

document.getElementById("opener2").addEventListener("click", function() {
    modal2.style.display = "block";
});

document.getElementsByClassName("close2")[0].addEventListener("click", function() {
  modal2.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
});

var slider = document.getElementById("myRange");
var output = document.getElementById("sliderValue");
var barChart = document.getElementById("bar-chart");
var isSliderAnimated = false;

d3.csv('assets/tab1_ability/data/ability_description.csv', function(error, descriptionData) {
  if (error) throw error;

  d3.csv('assets/tab1_ability/data/top_abilities.csv', function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.Count = +d.Count;
    });

    slider.max = data.length;
    slider.value = 1;
    output.innerHTML = slider.value;

    updateBarChart(data, descriptionData, data.length);

    slider.oninput = function() {
      output.innerHTML = this.value;
      updateBarChart(data, descriptionData, this.value);
    }

    window.onscroll = function() {
      var rect = barChart.getBoundingClientRect();
      if(rect.top < window.innerHeight && !isSliderAnimated) {
        animateSlider();
        isSliderAnimated = true;
      }
    };

    function animateSlider() {
      var maxVal = slider.max;
      var duration = 2000;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var easedFraction = Math.pow(fraction, 0.5);
        slider.value = Math.floor(easedFraction * maxVal) + 1;
        output.innerHTML = slider.value;
        updateBarChart(data, descriptionData, slider.value);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
  });
});

function updateBarChart(data, descriptionData, maxAbilities) {
  d3.select("#bar-chart").select("svg").remove();

  var slicedData = data.slice(0, maxAbilities);
  
  let margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  let x = d3.scaleBand().range([0, width]).padding(0.1);
  let y = d3.scaleLinear().range([height, 0]);

  let svg = d3.select("#bar-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

  x.domain(slicedData.map(function(d) { return d.Ability; }));
  y.domain([0, d3.max(slicedData, function(d) { return d.Count; })]);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .call(d3.axisLeft(y).tickFormat(d3.format(".2s")).ticks(10));

  svg.selectAll("bar")
      .data(slicedData)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.Ability); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Count); })
      .attr("height", function(d) { return height - y(d.Count); })
      .on("mouseover", function(event, d) {
        var description = descriptionData.find(function(desc) { return desc.Ability === d.Ability });
        d3.select("#tooltip")
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY + 5) + "px")
          .select("#value")
          .text(description ? description.Description : "");
        
        d3.select("#tooltip").classed("hidden", false);
      })
      .on("mouseout", function() {
        d3.select("#tooltip").classed("hidden", true);
      });
}
