var mapa;
var tipo;

// aca declaramos la funcion con la que creamos el mapa
function cargar_mapa() {
    mapa = new L.Map('mapa', {zoomControl: true}); // L.Map es clase central de la API: se usa para crear un mapa en una pÃ¡gina y manipularlo.
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution}); // TileLayer Se usa para cargar y mostrar capas de mosaico en el mapa
    mapa.setView(new L.LatLng(40.4165, -3.70256), 15).addLayer(layer_osm); // dejamos como coordenadas de inicio la ciudad de Madrid
    
}

function elegirDireccion(lat1, lng1, lat2, lng2, tipo_osm) {
    var localizacion1 = new L.LatLng(lat1, lng1);
    var localizacion2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(localizacion1, localizacion2); // LatLngBounds declara los limites al realizar la busqueda

    if (tipo) {
        mapa.removeLayer(tipo); // mapa.removeLayer Remueve capas del mapa, hace un efecto de limpieza en cada busqueda
    }
    if (tipo_osm == "node") {
        tipo = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(mapa); // circle es Una clase para dibujar superposiciones circulares en un mapa.
	mapa.fitBounds(bounds); //Establece una vista de mapa que contiene los lÃ­mites geogrÃ¡ficos dados con el zoom mÃ¡ximo
	mapa.setZoom(18); // setZoom  establece el zoom del mapa.
    }else{
         var localizacion3 = new L.LatLng(lat1, lng2); // LatLng: Crea un objeto que representa un punto geogrÃ¡fico con la latitud y longitud dadas (y opcionalmente la altitud).
         var localizacion4  = new L.LatLng(lat2, lng1);

         tipo = L.polyline( [localizacion1, localizacion4, localizacion2, localizacion3, localizacion1], {color: 'red'}).addTo(mapa);
	 mapa.fitBounds(bounds);  // L.polyline Crea una instancia de un objeto de polilÃ­nea dada una matriz de puntos geogrÃ¡ficos y, opcionalmente, un objeto de opciones. Puede crear un Polylineobjeto con varias lÃ­neas separadas ( MultiPolyline) pasando una matriz de matrices de puntos geogrÃ¡ficos.
    }  // toda esta documentacion nos la proporciona leaflet en este enlace:  https://www.wrld3d.com/wrld.js/latest/docs/leaflet/L.Polyline/
}

/*function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Tu estas aqui, con " + radius + " metros de aproximacion").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}*/

//aca hacemos la llamada a Ajax utilizando la para hacer la busqueda en vivo nominatim que es una biblioteca de busqueda de OpenStreetMaps

function direccion_buscador() {
    var entrada = document.getElementById("direccion");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + entrada.value, function(data) {
        var direcciones = [];

        $.each(data, function(key, val) {
            busqueda = val.boundingbox;
            direcciones.push("<li><a href='#' onclick='elegirDireccion(" + busqueda[0] + ", " + busqueda[2] + ", " + busqueda[1] + ", " + busqueda[3] + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
        });

        $('#resultado').empty();
        if (direcciones.length != 0) {
            $('<p>', { html: "Resultados de la b&uacute;queda:" }).appendTo('#resultado');
            $('<ul/>', {
                'class': 'my-new-list',
                html: direcciones.join('')
            }).appendTo('#resultado');
        }else{
             $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
        }
    });
}
window.onload = cargar_mapa;


/*map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);*/