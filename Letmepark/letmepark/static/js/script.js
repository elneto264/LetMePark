<<<<<<< HEAD
var mapa;
var tipo;

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

    if (tipo) {
        mapa.removeLayer(tipo);
    }
    if (tipo_osm == "node") {
	tipo = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(mapa);
	mapa.fitBounds(bounds);
	mapa.setZoom(18);
    }else{
         var loc3 = new L.LatLng(lat1, lng2);
         var loc4 = new L.LatLng(lat2, lng1);

	 tipo = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(mapa);
	 mapa.fitBounds(bounds);
    }
    var TodasLocalizaciones = [loc1,loc2,loc3,loc4,bounds];
    console.log(TodasLocalizaciones);
    return TodasLocalizaciones;
    
}


function direccion_buscador() {
    var entrada = document.getElementById("direccion");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + entrada.value, function(data) {
        var direcciones = [];

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            direcciones.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
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
=======
//------------------------------------------------------------------------merge de los JS

/* $('#tip').change(valor) cuando tip cambie llama a la funcion valor*/
function valor() {
    var id = $(this).val();
    console.log(id)
    $.ajax({
        data: { 'id': id },
        /* data es el select de donde se elige la opcion */
        url: '/letmepark/buscar/',
        type: 'get',
        success: function(data) {
            console.log(data)
            var html = ""
            for (var i = 0; i < data.length; i++) {
                html += '<tr><td>' + data[i].fields.name + '</td><td>' + +data[i].fields.provider + '</td></tr>'
            }
            $('#resultado').html(html);
        }
    });
}

//-----------------------------------------------------------------Parte Yesid de carga de mapa------------------------------------------------------------------


var mapa;
var tipo;

// aca declaramos la funcion con la que creamos el mapa
function cargar_mapa() {
    mapa = new L.Map('mapa', { zoomControl: true }); // L.Map es clase central de la API: se usa para crear un mapa en una pÃ¡gina y manipularlo.
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttribution }); // TileLayer Se usa para cargar y mostrar capas de mosaico en el mapa
    mapa.setView(new L.LatLng(40.4165, -3.70256), 15).addLayer(layer_osm); // dejamos como coordenadas de inicio la ciudad de Madrid

}


//--------------------------------------------------------------funcion de seleccion de direccion-----------------------------------------------------------------------------------------------------------

function elegirDireccion(lat1, lng1, lat2, lng2, tipo_osm) {
    var localizacion1 = new L.LatLng(lat1, lng1);
    var localizacion2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(localizacion1, localizacion2); // LatLngBounds declara los limites al realizar la busqueda

    if (tipo) {
        mapa.removeLayer(tipo); // mapa.removeLayer Remueve capas del mapa, hace un efecto de limpieza en cada busqueda
    }
    if (tipo_osm == "node") {
        tipo = L.circle(loc1, 25, { color: 'green', fill: false }).addTo(mapa); // circle es Una clase para dibujar superposiciones circulares en un mapa.
        mapa.fitBounds(bounds); //Establece una vista de mapa que contiene los lÃ­mites geogrÃ¡ficos dados con el zoom mÃ¡ximo
        mapa.setZoom(18); // setZoom  establece el zoom del mapa.
    } else {
        var localizacion3 = new L.LatLng(lat1, lng2); // LatLng: Crea un objeto que representa un punto geogrÃ¡fico con la latitud y longitud dadas (y opcionalmente la altitud).
        var localizacion4 = new L.LatLng(lat2, lng1);

        tipo = L.polyline([localizacion1, localizacion4, localizacion2, localizacion3, localizacion1], { color: 'red' }).addTo(mapa);
        mapa.fitBounds(bounds); // L.polyline Crea una instancia de un objeto de polilÃ­nea dada una matriz de puntos geogrÃ¡ficos y, opcionalmente, un objeto de opciones. Puede crear un Polylineobjeto con varias lÃ­neas separadas ( MultiPolyline) pasando una matriz de matrices de puntos geogrÃ¡ficos.
    } // toda esta documentacion nos la proporciona leaflet en este enlace:  https://www.wrld3d.com/wrld.js/latest/docs/leaflet/L.Polyline/
}

// ----------------------------------------------------------------equivalente del AJAX para el buscador-------------------------------------------------------------------------------------

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
        } else {
            $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
        }
    });
}
window.onload = cargar_mapa;

//--------------------------------------------------------------------parte de marcadores----------------------------------------------------------------------------------------
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
async function getData() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;


    // multiples markers 

    var planes = [
        ["7C6B07", -40.99497, 174.50808],
        ["7C6B38", -41.30269, 173.63696],
        ["7C6CA1", -41.49413, 173.5421],
        ["7C6CA2", -40.98585, 174.50659],
        ["C81D9D", -40.93163, 173.81726],
        ["C82009", -41.5183, 174.78081],
        ["C82081", -41.42079, 173.5783],
        ["C820AB", -42.08414, 173.96632],
        ["C820B6", -41.51285, 173.53274]
    ];

    var map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org/%22%3EOpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/%22%3ECC-BY-SA</a>, Imagery © <a href="http://cloudmade.com/%22%3ECloudMade</a>',
        maxZoom: 18
    }).addTo(map);
    L.control.scale().addTo(map);


    issmarker = L.marker([latitude, longitude]).addTo(map); //la variable que cambia segun la lat y long


    //las variables fijas
    for (var i = 0; i < planes.length; i++) {
        marker = new L.marker([planes[i][1], planes[i][2]])
            .bindPopup(planes[i][0])
            .addTo(map);
    }


    //Definimos una capa de tipo Cluster Group
    //var markers = L.markerClusterGroup(); en cluster normal con limites de zona 

    //para que no aparezcan los limites de las zonas
    //var markers = L.markerClusterGroup();

    //Añadimos a esta capa los distintos marcadores en random -- markers.addLayer(L.marker(getRandomLatLng(map)));

    //Añadimos la capa Cluster al mapa
    // map.addLayer(markers);


    // markers encluster
    // ----------------------------------------------------------------------------------------------


    // formas para el mapa

    // circulo
    var circle = L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);


    //  para el triangulo la latitud y longitud varian                                                    

    /*var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(map)*/

    /*var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Funciona el click con datos " + e.latlng.toString())
            .openOn(map);
    }


    map.on('click', onMapClick);
    console.log(marker);*/

}

getData();
>>>>>>> Desarollo
