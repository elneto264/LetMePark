var map = L.map('map').
setView([41.66, -4.72], 15);



L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);
L.control.scale().addTo(map);
L.control.scale().addTo(map);




map.locate({ setView: true, maxZoom: 16 });

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Tu estas aqui, con " + radius + " metros de aproximacion").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);