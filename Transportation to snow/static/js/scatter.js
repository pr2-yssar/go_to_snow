
d3.json('/scatter').then(response=> {
    
    var data = [
      {
        x: response.acres,
        y: response.vertical,
        type: 'scatter'
      }
    ];



Plotly.newPlot('scatter', data);
var trace1 = {
  x: response.acres,
  y: response.vertical,
  mode: 'markers',
  type: 'scatter',
  marker: { size: response.lifts }
};

var data = [trace1];
var layout = {
  xaxis: {
    range: [ 0, 7400 ]
  },
  yaxis: {
    range: [0, 4500]
  },
  title:'Ski Resort Size'
};
Plotly.newPlot('scatter_plot', data, layout);
