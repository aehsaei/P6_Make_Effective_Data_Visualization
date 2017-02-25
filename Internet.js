"use strict";

// Define the plot dimensions
var margin = 50;
var width = 900 - margin;
var height = 650 - margin;

// Default Grey Color
var default_color = "rgb(210, 210, 210)";

// Colors for each button
var world_color = "rgb(0, 205, 102)";
var unite_color = "rgb(70, 130, 180)";
var highe_color = "rgb(238, 220, 130)";

// -------------------------------------------------------------------------
// Main draw function to create the chart
// -------------------------------------------------------------------------
function draw(data) {

    // Create SVG Scalable Vector Graphic variable
    var svg = d3.select("#vis")
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .attr("class", "svg");

    // Create myChart variable within the svg item to house the chart. 
    // 'g' is an arbitrary container element in SVG equivalent to 'div' in HTML
    var myChart = svg.append("g")
        .attr("width", width)
        .attr('height', height)
        .attr("class", "chart");
            
    // -------------------------------------------------------------------------
    // Create the Axes
    // -------------------------------------------------------------------------

     // Define the min and max dates along the x-axis
    var mindate = new Date(1989, 11, 31);
    var maxdate = new Date(2015, 11, 31);

    // Create the x-axis scale
    var xScale = d3.time.scale()
        .domain([mindate, maxdate]) // range of x values
        .range([margin, width]); // range of chart space

    // Create the x-axis
    var xAxis = d3.svg.axis()
        .ticks(2015-1990) // number of tick marks along axis
        .orient("bottom") // axis location
        .scale(xScale);

    // Draw the x-axis with labels
    myChart.append("g")
        .attr("class", "xAxis") // create class to modify in CSS
        .attr("transform", "translate(0," + (height) + ")") // move to bottom
        .call(xAxis);

    // Create the y-axis scale
    var yScale = d3.scale.linear()
        .domain([Math.max.apply(Math,data.map(function(d){return d.Users;})),0])
        .range([margin, height]); // range of chart space

    // Create the y-axis
    var yAxis = d3.svg.axis()
        .ticks(10) // number of tick marks along axis
        .innerTickSize(-(width-margin))
        .outerTickSize(0)
        .orient("left") // axis location
        .scale(yScale);

    // Draw the y-axis with labels
    myChart.append("g")
        .attr("class", "yAxis") // create class to modify in CSS
        .attr("transform", "translate("+ (margin) + ", 0)") // move axis to side
        .call(yAxis);

    // Add a title to the y-axis
    myChart.append("text")
        .attr("text-anchor", "middle")  // transform applied to this anchor
        .attr("transform", "translate("+ (20) +","+(height/2)+")rotate(-90)")
        .text("Internet Users (Per 100 People)");

    // -------------------------------------------------------------------------
    // Define function to react to button clicks
    // -------------------------------------------------------------------------
    var button_click = function(){
        
        // Get the current color
        var current_color = d3.select(this).style("background-color");

        // Create a new color variable
        var new_color = "";

        // Create the name of the line
        var line_name = "";

        // Create the width of the line
        var new_width;

        // Create a conditional switch for each button
        switch (this.text) {
            case "World Average":
                if (current_color == default_color) {
                    new_color = world_color;
                    new_width = 3;
                } else {
                    new_color = default_color;
                    new_width = 1;
                }
                line_name = ".lineWorld";
                break;
            case "United States":
                if (current_color == default_color) {
                    new_color = unite_color;
                    new_width = 3;
                } else {
                    new_color = default_color;
                    new_width = 1;
                }
                line_name = ".lineUnited.States";
                break;
            case "Highest Value":
                if (current_color == default_color) {
                    new_color = highe_color;
                    new_width = 3;
                } else {
                    new_color = default_color;
                    new_width = 1;
                }
                line_name = ".lineIceland"
                break;
            default:
                new_color = default_color;
                new_width = 1;
        }
        
        // Change the button color
        d3.select(this).style("background", new_color);

        // Change the line color
        d3.select("svg").select(line_name).style("stroke", new_color);
        d3.select("svg").select(line_name).style("stroke-width", new_width);

        // Bring the line to front of lines
        d3.select("svg").select(line_name).moveToFront();
    };

    // -------------------------------------------------------------------------
    // Create buttons that toggle colors when clicked
    // -------------------------------------------------------------------------
    var buttons = d3.selectAll("#buttons").selectAll("a")
        .style("background", default_color)
        .on("click", button_click);


    // -------------------------------------------------------------------------
    // Organize the data using the "nest" feature
    // -------------------------------------------------------------------------

    // Group the data into a nested structure:
    //  Key:     Country 
    //  Values:  Year, Users
    var nested = d3.nest()
        .key( function(d) { return d["Country.Name"]; })
        .sortKeys(d3.ascending)
        .entries(data);

    // Create a separate dataset for the 3 particular cases
    var wor_data = [];
    var usa_data = [];
    var hig_data = [];
    nested.forEach(function(d){
        if (d.key == "United States"){
            usa_data.push(d);
        } else if (d.key == "World"){
            wor_data.push(d);
        } else if (d.key == "Bermuda"){
            hig_data.push(d);
        }
    })

    // -------------------------------------------------------------------------
    // Create function to plot the lines
    // -------------------------------------------------------------------------
    function plot_lines(data, lineColor, lineWidth) {

        // Define a generice line and scale to the chart
        var UsersLine = d3.svg.line()
            .x(function(d) { return xScale(d.Year); })
            .y(function(d) { return yScale(d.Users); });

        // Create a focus text box to appear on mouse events
        var focus = d3.select("body").append("focus")
            .attr("class", "focus")
            .style("display", "none");

        // Loop through the data and add all the line paths
        data.forEach(function(d, i){
            myChart.append("path")
                .attr("class", "line" + d.key)
                .style("stroke", lineColor)
                .style("stroke-width", lineWidth)
                .attr("d", UsersLine(d.values))
                .attr("Country", d.key)
                .attr("Users", d.values[25]["Users"])
                .datum(data);
        });

        // Select each line and add mouse events
        myChart.selectAll("path")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", mousemove);

        // Define the mouse over event
        function mouseover(){
            // Show the pop-up text box
            focus.style("display", "inline");
            
            // Use D3 to select element, change color and size
            d3.select(this)
                .style("stroke", "red")
                .style("stroke-width", 3);

            // Move line to front of all lines for visibility
            d3.select(this).moveToFront();
        };

        // Define the mouse move to new location event
        function mousemove() {

            var country = d3.select(this).attr("Country");
            var users = Math.floor(d3.select(this).attr("Users"));

            // Show the pop-up text box
            focus.text(country + ": " + users + "% used the internet in 2015")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 35) + "px");
        };

        // Define the mouse exit event
        function mouseout() {
            var prev_color = default_color;
            var prev_width = 1;

            // Erase the pop-up text box
            focus.style("display", "none");

            // Check for buttons pressed to restore previous color state
            if (d3.select(this).attr("Country") == "United States"){
                prev_color = d3.selectAll("#buttons").select("a#U").style("background-color");
                prev_width = (prev_color == default_color) ? 1 : 3;
            } else if (d3.select(this).attr("Country") == "World"){
                prev_color = d3.selectAll("#buttons").select("a#W").style("background-color");
                prev_width = (prev_color == default_color) ? 1 : 3;
            } else if (d3.select(this).attr("Country") == "Iceland"){
                prev_color = d3.selectAll("#buttons").select("a#H").style("background-color");
                prev_width = (prev_color == default_color) ? 1 : 3;
            } else {
                prev_color = default_color;
                prev_width = 1;
            }           

            // Restore the color and width to the line
            d3.select(this)
                .style("stroke", prev_color)
                .style("stroke-width", prev_width);

            // Move line to the back of other lines
            if (prev_color == default_color){
                d3.select(this).moveToBack();
            } else{
                d3.select(this).moveToFront();
            }
        };
    };

    // -------------------------------------------------------------------------
    // Function to move element to the front (visibility)
    // -------------------------------------------------------------------------
    d3.selection.prototype.moveToFront = function() {  
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };
        
    // -------------------------------------------------------------------------
    // Function to move element to the back (visibility)
    // -------------------------------------------------------------------------
    d3.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
            var firstChild = this.parentNode.firstChild; 
            if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
            } 
        });
    };
    
    // -------------------------------------------------------------------------
    // Plot the initial chart
    // -------------------------------------------------------------------------
    plot_lines(nested, default_color, 1);

};
0