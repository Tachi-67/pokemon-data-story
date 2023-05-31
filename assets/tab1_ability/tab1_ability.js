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
var isSliderAnimated = false; // Add a flag to track if the slider has been animated


d3.csv('assets/tab1_ability/data/ability_description.csv', function(error, descriptionData) {
  if (error) throw error;

  d3.csv('assets/tab1_ability/data/top_abilities.csv', function(error, data) {
    if (error) throw error;
    
    data.forEach(function(d) {
      d.Count = +d.Count;
    });

    // Update the slider max value based on the data length
    slider.max = data.length;
    slider.value = 1;
    output.innerHTML = slider.value;  // Display the default slider value

    // Update the chart initially
    updateBarChart(data, descriptionData, data.length);

    // Listen to slider changes and update the chart
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
      var duration = 2000;  // Duration for the animation
      var start = null;
  
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var fraction = Math.min(progress / duration, 1);
        var easedFraction = Math.pow(fraction, 0.5); // Change this function for different easing effects
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
  // Remove existing chart if it exists
  d3.select("#bar-chart").select("svg").remove();

  // Slice the data to keep the top abilities based on the slider value
  var slicedData = data.slice(0, maxAbilities);
  
  // Your existing code to render the chart with slicedData
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

  x.domain(slicedData.map(d => d.Ability));
  y.domain([0, d3.max(slicedData, d => d.Count)]);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

  svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -height/2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .text("Occurance Count");

  svg.selectAll(".bar")
      .data(slicedData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Ability))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.Count))
      .attr("height", d => height - y(d.Count))
      .attr("fill", "#E9C46A")
      
      .on('click', function(d, i) {
        // 找到对应的描述
        let matchedDescription = descriptionData.find(desc => desc.Ability === d.Ability);
        let abilityDescription = matchedDescription ? matchedDescription.description : 'Description not found';
        d3.select('#bar-info')
            .html(`
                <p style="display: inline-block;"><span style="color:#E9C46A;">${d.Ability}</span>: ${abilityDescription}</p>
            `);
    })
      
      .on("mouseover", function(d) {
        let html = `Ability: ${d.Ability}<br/>Count: ${d.Count}`;
        d3.select("#tooltip")
            .style("opacity", 1)
            .html(html)
            .style('left', (event.pageX + 10) + 'px') 
            .style('top', (event.pageY + 10) + 'px');
    })
    .on("mouseout", function(d) {
        d3.select("#tooltip")
            .style("opacity", 0);
    });
}
