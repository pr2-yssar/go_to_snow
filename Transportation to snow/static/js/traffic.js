

 function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 4.6,
      center: {lat: 38, lng: -96}
    });

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

 }


console.log('hello world');
