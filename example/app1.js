function initialize() {

    var coords = [
        {'lat' : '48.890609', 'lon' : '11.184313'},
        {'lat' : '48.8167', 'lon' : '11.3667'},
        {'lat' : '48.8333', 'lon' : '11.2167'},
        {'lat' : '48.8', 'lon' : '11.3'},
        {'lat' : '48.7833', 'lon' : '11.2333'},
        {'lat' : '48.8167', 'lon' : '11.3167'},
        {'lat' : '48.85', 'lon' : '11.3167'},
        {'lat' : '48.8', 'lon' : '11.2333'},
        {'lat' : '48.95', 'lon' : '11.2'},
        {'lat' : '48.9', 'lon' : '11.1'},
        {'lat' : '49', 'lon' : '11.2167'},
        {'lat' : '48.9167', 'lon' : '11.3'},
        {'lat' : '48.8333', 'lon' : '11.4167'},
        {'lat' : '48.8667', 'lon' : '11.0667'},
        {'lat' : '48.7667', 'lon' : '11.0667'},
        {'lat' : '48.893175', 'lon' : '10.990565'},
        {'lat' : '48.8833', 'lon' : '11'},
        {'lat' : '48.8', 'lon' : '11.1'},
        {'lat' : '48.88636', 'lon' : '11.198945'},
        {'lat' : '48.872829', 'lon' : '11.373385'},
        {'lat' : '48.86946', 'lon' : '11.00602'}
    ];


    var centrePoint = new google.maps.LatLng(48.85, 11.25);

    var mapOptions = {
        zoom: 10,
        center: centrePoint,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var poly;
    var polyHull;
    var convexHull = new ConvexHullGrahamScan();


    poly = new google.maps.Polygon({
        paths: coords.map(function(item){
            return new google.maps.LatLng(item.lat, item.lon);
        }),
        strokeColor: '#000',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#000',
        fillOpacity: 0.1
    });


    coords.forEach(function (item) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.lat, item.lon),
            map: map
        });
        convexHull.addPoint(item.lon, item.lat);
    });


    if (convexHull.points.length > 0) {
        var hullPoints = convexHull.getHull();



        //Convert to google latlng objects
        hullPoints = hullPoints.map(function (item) {
            return new google.maps.LatLng(item.y, item.x);
        });

        console.log(hullPoints);

        polyHull = new google.maps.Polygon({
            paths: hullPoints,
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000',
            fillOpacity: 0.35
        });

        polyHull.setMap(map);

    }
}

google.maps.event.addDomListener(window, 'load', initialize);