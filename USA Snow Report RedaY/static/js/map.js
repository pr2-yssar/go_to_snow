
d3.json('/geodata').then(response=> {
  console.log(response)
  

  var data = [{
       type: 'scattermapbox',
       text: response['resort_name'],
       lat: response['lat'],
       lon: response['lon']

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
    paper_bgcolor: '#191A1A', 
    plot_bgcolor: '#191A1A', 
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
    mapboxAccessToken: 'your_mapbox_access_token_key_here'
  });
  
  Plotly.plot('graphDiv', data, layout, {showSendToCloud: true});
});
