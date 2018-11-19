var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.777090, lng: -121.272080},
    zoom: 16,
    mapTypeId: 'roadmap',
    {% include 'js/map_styles.js' %},
    mapTypeControlOptions: { mapTypeIds: [] },
    fullscreenControl: false,
    streetViewControl: false
  });

  var svgPath = "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0";
  var scale = 0.8
  
  icons = {
    Weapon : {
      path: svgPath,
      fillColor: '#cc3300',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    Weapon2 : {
      path: svgPath,
      fillColor: '#cc3300',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale * 2
    },
    Breakin : {
      path: svgPath,
      fillColor: '#ff9966',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    Breakin2 : {
      path: svgPath,
      fillColor: '#ff9966',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale * 2
    },
    Masked : {
      path: svgPath,
      fillColor: '#ffcc00',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    Masked2 : {
      path: svgPath,
      fillColor: '#ffcc00',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale * 2
    },
    Suspicious : {
      path: svgPath,
      fillColor: '#99cc33',
      fillOpacity: 1,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: scale
    },
    Suspicious2 : {
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
      timeStamp : {{incident["timeStamp"]}},
      dateStr : "{{incident['dateStr']}}"
    },
    {% endfor %}
  ]

  incidentFeature.forEach(function(feature) {
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 320,
      content : "<h2>" + feature.type + "</h2><h4>" + feature.dateStr + "</h4><img height=200px width=300px src='static/crimePhotos/" + feature.image + "'>"
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
      position: new google.maps.LatLng(38.774590, -121.272080),
      type: 'watchDog',
      name: '0'
    },
    {
      position: new google.maps.LatLng(38.776090, -121.271080),
      type: 'watchDog',
      name: '1'
    },
    {
      position: new google.maps.LatLng(38.776590, -121.275080),
      type: 'watchDog',
      name: '2'
    },
    {
      position: new google.maps.LatLng(38.772590, -121.275480),
      type: 'watchDog',
      name: '3'
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