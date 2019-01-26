


d3.json('/geodata').then(response=> {
  console.log(response);
 
var resortName = response['resort_name'],  
    inches24Hour = response['inches_24_hr'],  
    inches72Hour = response['inches_72_hr'], 
    snowData = [resortName, inches24Hour, inches72Hour].reduce((a, b, c) => a.map((v, i) => v +
     ' <br> ' + b[i] + ' <br> ' + c[i]));

    console.log(resortName);
    console.log(inches24Hour);
    console.log(inches72Hour);
    console.log(snowData);

var data = [{
  type: 'scattermapbox',
  lat: response['lat'],
  lon: response['lon'],
  mode: 'markers',
  marker: {
    size: 12,
    color:'magenta',
    hoverinfo:'text'
  },
    text: snowData


}];


  
  var layout = {
     title: 'US Ski Resorts',
     font: {
         color: 'white'
     },
    dragmode: 'zoom', 
    mapbox: {
      center: {
        lat: 38.03697222, 
        lon: -90.70916722
      }, 
      domain: {
        x: [0, 1], 
        y: [0, 1]
      }, 
      style: 'dark', 
      zoom: 3
    }, 
    margin: {
      r: 20, 
      t: 40, 
      b: 20, 
      l: 20, 
      pad: 0
    }, 
    paper_bgcolor: '#1a1919', //'#191A1A'
    plot_bgcolor: '#1a1919', 
    showlegend: false,
     annotations: [{
       x: 0,
       y: 0,
       xref: 'paper',
       yref: 'paper',
         text: 'Source: <a href="https://www.onthesnow.com/united-states/skireport.html" style="color: rgb(255,255,255)">On The Snow</a>',
         showarrow: false
     }]
  };
  
  Plotly.setPlotConfig({
    mapboxAccessToken: 'YOURPLOTLYKEYHERE'
  });
  
  Plotly.plot('graphDiv', data, layout, {showSendToCloud: true});
});
