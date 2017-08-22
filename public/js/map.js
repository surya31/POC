var map;

var voices = [
        {title: 'Little Village', lat: 41.845247, lng: -87.7209646, zIndex: 4},
        {title: 'Cicero', lat: 41.8524987, lng: -87.7240476, zIndex: 5},
        {title: 'Berwyn', lat: 41.8549491, lng: -87.7866108, zIndex: 3},
        {title: 'Oak Park', lat: 41.8871616, lng: -87.8074677, zIndex: 2},
        {title: 'Melrose Park', lat: 41.9041611, lng: -87.8831141, zIndex: 1}
      ];

function initMap() {
	var politikMap = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
    map = new google.maps.Map(document.getElementById('map'), {
    		center: {lat: 41.8781, lng: -87.6298},
          	zoom: 12
	});
    map.mapTypes.set('politik-map', politikMap);
    map.setMapTypeId('politik-map');

    setMarkers(map);

    var bermudaTriangle = new google.maps.Polygon({
          paths: voices,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
    bermudaTriangle.setMap(map);
}

function setMarkers(map) {
	// Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
	var image = {
    	url: '/images/map-icon.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(22, 22),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(2, 15)
	};

    var image1 = {
        url: '/images/map-icon-green.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(22, 22),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(2, 15)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
    	coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
	};
    for (var i = 0; i < voices.length; i++) {
        var im = i % 2 > 0 ? image : image1;
    	var voice = voices[i];
        var marker = new google.maps.Marker({
        	position: {lat: voice.lat, lng: voice.lng},
        	map: map,
            icon: im,
            shape: shape,
            title: voice.title,
            zIndex: voice.zIndex
        });
    }
}