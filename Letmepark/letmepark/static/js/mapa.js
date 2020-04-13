var mapa;
<<<<<<< HEAD
var feature;
=======
<<<<<<< HEAD
var feature;

function cargar_mapa() {
    mapa = new L.Map('mapa', {zoomControl: true});
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    mapa.setView(new L.LatLng(40.4165, -3.70256), 13).addLayer(layer_osm);
}

function elegirDireccion(lat1, lng1, lat2, lng2, tipo_osm) {
    var loc1 = new L.LatLng(lat1, lng1);
    var loc2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(loc1, loc2);

    if (feature) {
        mapa.removeLayer(feature);
    }
    if (tipo_osm == "node") {
	feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(mapa);
	mapa.fitBounds(bounds);
	mapa.setZoom(18);
    }else{
         var loc3 = new L.LatLng(lat1, lng2);
         var loc4 = new L.LatLng(lat2, lng1);

	 feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(mapa);
	 mapa.fitBounds(bounds);
    }
}

=======
var tipo;
>>>>>>> Desarollo

function cargar_mapa() {
    mapa = new L.Map('mapa', {zoomControl: true});
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    mapa.setView(new L.LatLng(40.4165, -3.70256), 13).addLayer(layer_osm);
}

function elegirDireccion(lat1, lng1, lat2, lng2, tipo_osm) {
    var loc1 = new L.LatLng(lat1, lng1);
    var loc2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(loc1, loc2);

    if (feature) {
        mapa.removeLayer(feature);
    }
    if (tipo_osm == "node") {
	feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(mapa);
	mapa.fitBounds(bounds);
	mapa.setZoom(18);
    }else{
         var loc3 = new L.LatLng(lat1, lng2);
         var loc4 = new L.LatLng(lat2, lng1);

	 feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(mapa);
	 mapa.fitBounds(bounds);
    }
}

<<<<<<< HEAD
=======
function onLocationError(e) {
    alert(e.message);
}*/

//aca hacemos la llamada a Ajax utilizando la para hacer la busqueda en vivo nominatim que es una biblioteca de busqueda de OpenStreetMaps

>>>>>>> Desarollo
>>>>>>> Desarollo
function direccion_buscador() {
    var entrada = document.getElementById("direccion");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + entrada.value, function(data) {
<<<<<<< HEAD
        var items = [];
=======
<<<<<<< HEAD
        var items = [];

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
        });

        $('#resultado').empty();
        if (items.length != 0) {
            $('<p>', { html: "Resultados de la b&uacute;queda:" }).appendTo('#resultado');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
=======
        var direcciones = [];
>>>>>>> Desarollo

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
        });

        $('#resultado').empty();
        if (items.length != 0) {
            $('<p>', { html: "Resultados de la b&uacute;queda:" }).appendTo('#resultado');
            $('<ul/>', {
                'class': 'my-new-list',
<<<<<<< HEAD
                html: items.join('')
=======
                html: direcciones.join('')
>>>>>>> Desarollo
>>>>>>> Desarollo
            }).appendTo('#resultado');
        }else{
             $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
        }
    });
}
window.onload = cargar_mapa;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======


/*map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);*/
>>>>>>> Desarollo
>>>>>>> Desarollo
