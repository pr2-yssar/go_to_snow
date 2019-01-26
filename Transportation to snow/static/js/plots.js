





d3.json('/bar').then(response=> {

  // Fisrt Plot
	var data = [
	  {
	    x: response.resort_name,
	    y: response.inches_24_hr,
	    type: 'bar'
	  }
	];

Plotly.newPlot('bar', data);


//Create same 
var trace1 = {
  x: response.resort_name,
  y: response.inches_24_hr,
  name: '24 Hour Snowfall',
  type: 'bar'
};

var trace2 = {
  x: response.resort_name,
  y: response.inches_72_hr,
  name: '72 Hour Snowfall',
  type: 'bar'
};

var data = [trace1, trace2];


var layout = {
     barmode:'stack',
     title: 'U.S. Resorts with the Most Fresh Snow',
     xaxis: {
      title:  "Resorts"
     },
   yaxis: {
      title: "Inches of Snowfall"
   }
};

Plotly.newPlot('bar', data, layout);
});

