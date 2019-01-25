


d3.json('/geodata').then(response=> {
  console.log(response)
  
var data = [{
  type: 'scattermapbox',
  lat: response['lat'],
  lon: response['lon'],
  mode: 'markers',
  marker: {
    size: 10,
    color:'magenta',
    hoverinfo:'text'
  },
  text: response['resort_name'], 




// var inputArray1 = ['abc', 'def', 'ghi'],
//     inputArray2 = ['3', '6', '9'],
//     outputArray = [inputArray1, inputArray2].reduce((a, b) => a.map((v, i) => v + ' - ' + b[i]));

// console.log(outputArray);



  
  // text: response['resort_name'] + '<br>' +
  //  'Inches last 24h: ' + response['inches_24_hr'] + '<br>' +
  //   'Inches last 72h: ' + response['inches_72_hr'],
}];



//   var data = [{
//        type: 'scattermapbox',
//        text: response['resort_name'],
//        lat: response['lat'],
//        lon: response['lon'],
//        // h24: response['inches_24_hr'],
//        // h72: response['inches_72_hr'],
//        // open: response['open_status']

//     }];
  
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
    mapboxAccessToken: 'pk.eyJ1IjoicmVkYWIiLCJhIjoiY2pwcHBxa3I2MHI3aTQzbWx4MWEyajZ4dyJ9.kufbSTDyB5DsKZQIx1MnTA'
  });
  
  Plotly.plot('graphDiv', data, layout, {showSendToCloud: true});
});
