var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.056600, lng: -117.274810},
    zoom: 17,
    mapTypeId: 'roadmap',
    {% include 'js/map_styles.js' %},
    mapTypeControlOptions: { mapTypeIds: [] },
    fullscreenControl: false,
    streetViewControl: false
  });

  var svgPath = "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0";
  var scale = 0.8
  
  icons = {
    weapon : {
      path: svgPath,
      fillColor: '#cc3300',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    weapon2 : {
      path: svgPath,
      fillColor: '#cc3300',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale * 2
    },
    breakin : {
      path: svgPath,
      fillColor: '#ff9966',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    breakin2 : {
      path: svgPath,
      fillColor: '#ff9966',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale * 2
    },
    masked : {
      path: svgPath,
      fillColor: '#ffcc00',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    masked2 : {
      path: svgPath,
      fillColor: '#ffcc00',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale * 2
    },
    suspicious : {
      path: svgPath,
      fillColor: '#99cc33',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    suspicious2 : {
      path: svgPath,
      fillColor: '#99cc33',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale * 2
    },
    watchDog : {
      //url : "https://image.flaticon.com/icons/svg/17/17479.svg",
      url : "https://upload.wikimedia.org/wikipedia/commons/0/09/White_paw_print.png",
      scaledSize: new google.maps.Size(30, 30)
    },
    watchDog2 : {
      //url : "https://image.flaticon.com/icons/svg/17/17479.svg",
      url : "https://upload.wikimedia.org/wikipedia/commons/0/09/White_paw_print.png",
      scaledSize: new google.maps.Size(60, 60)
    }
  };

  var incidentFeature = [
    {% for incident in incidentData %}
    {
      position: new google.maps.LatLng({{incident['lat']}}, {{incident['lng']}}),
      type: "{{incident['type']}}",
      fillOpacity : {{incident["opacity"]}},
      image : "{{incident['fileName']}}",
      timeStamp : {{incident["timeStamp"]}}
    },
    {% endfor %}
  ]

  incidentFeature.forEach(function(feature) {
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 320,
      content : "<h1>" + feature.type + "</h1><img height=200px width=300px src='static/" + feature.image + "'>"
    });

    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type],
      map: map
    });

    marker["icon"].fillOpacity = feature.fillOpacity

    marker.addListener('click', function(){
      infowindow.open(map, marker);
    })

    document.getElementById(feature.timeStamp).addEventListener('mouseover', function(){
      marker.setIcon(icons[feature.type + "2"])
      marker["icon"].fillOpacity = feature.fillOpacity
    })

    document.getElementById(feature.timeStamp).addEventListener('mouseout', function(){
      marker.setIcon(icons[feature.type])
      marker["icon"].fillOpacity = feature.fillOpacity
    })

    document.getElementById(feature.timeStamp).addEventListener('click', function(){
      map.setCenter(feature.position); 
    })
  });

  var watchDogFeatures = [
    {
      position: new google.maps.LatLng(33.058000, -117.276810),
      type: 'watchDog',
      name: '0'
    },
    {
      position: new google.maps.LatLng(33.056700, -117.275810),
      type: 'watchDog',
      name: '1'
    },
    {
      position: new google.maps.LatLng(33.056700, -117.274800),
      type: 'watchDog',
      name: '2'
    }
  ]

  watchDogFeatures.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type],
      map: map
    });

    document.getElementById(feature.name).addEventListener('mouseover', function(){
      marker.setIcon(icons[feature.type + "2"])
      marker["icon"].fillOpacity = feature.fillOpacity
    })

    document.getElementById(feature.name).addEventListener('mouseout', function(){
      marker.setIcon(icons[feature.type])
      marker["icon"].fillOpacity = feature.fillOpacity
    })

    document.getElementById(feature.name).addEventListener('click', function(){
      map.setCenter(feature.position); 
    })
  });

}