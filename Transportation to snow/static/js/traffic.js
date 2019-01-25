

 function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 10,
      center: {lat: 38.03697222, lng: -90.70916722}
    });

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
 }


console.log('hello world');



// var map;
//       var NEW_ZEALAND_BOUNDS = {
//         north: -34.36,
//         south: -47.35,
//         west: 166.28,
//         east: -175.81,
//       };
//       var AUCKLAND = {lat: -37.06, lng: 174.58};

//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: AUCKLAND,
//           restriction: {
//             latLngBounds: NEW_ZEALAND_BOUNDS,
//             strictBounds: false,
//           },
//           zoom: 7,
//         });
//       }

//  console.log('hello world');