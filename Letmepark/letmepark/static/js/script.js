var mapa;
var tipo;

function cargar_mapa() {
    mapa = new L.Map('mapa', { zoomControl: true });
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttribution });
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
        tipo = L.circle(loc1, 25, { color: 'green', fill: false }).addTo(mapa);
        mapa.fitBounds(bounds);
        mapa.setZoom(18);
    } else {
        var loc3 = new L.LatLng(lat1, lng2);
        var loc4 = new L.LatLng(lat2, lng1);
        tipo = L.polyline([loc1, loc4, loc2, loc3, loc1], { color: 'red' }).addTo(mapa);
        mapa.fitBounds(bounds);
    }
    var TodasLocalizaciones = [loc1];
    console.log(TodasLocalizaciones);
    // return TodasLocalizaciones;
    valor(TodasLocalizaciones);
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
        } else {
            $('<p>', { html: "Ningun resultado encontrado." }).appendTo('#resultado');
        }
    });
}
//Al parametro le ponemos el nombre de la variable de TodasLocalizaciones
function valor(TodasLocalizaciones) {
    console.log('este texto corresponde' + TodasLocalizaciones)
    $.ajax({
        data: { 'loc': TodasLocalizaciones },
        url: '/buscador/ajax/',
        type: 'get',
        success: function(data) {
            console.log(data + "funciona en el success")
                //var html = ""
                // for(var i = 0; i < data.length; i++){
                //     html += '<tr><td>'+ data[i].fields.nombre + '</td><td>'+data[i].fields.caracteristica +'</td><tr>'
                // }
                // $('#info').html(html);

            //var pines = [
            //  [fields.lmpPID, fields.name, fields.provider, fields.address, fields.lon, fields.lat], /* estas son las posiciones que aparecen en el for mas abajo, tomat en cuenta las comas porque son las que distinguen las posiciones de array*/
            // [fields.lmpPID, fields.name, fields.provider, fields.address, fields.lon, fields.lat],
            // [fields.lmpPID, fields.name, fields.provider, fields.address, fields.lon, fields.lat],
            // [fields.lmpPID, fields.name, fields.provider, fields.address, fields.lon, fields.lat],
            //[fields.lmpPID, fields.name, fields.provider, fields.address, fields.lon, fields.lat],

            // ];


            //for (var i = 0; i < pines.length; i++) {
            // marker += new L.marker([pines[i][1], pines[i][2], pines[i][3], pines[i][4]]) /* aqui vas las posiciones del array de arriba*/
            //    .bindPopup(pines[i][0])
            //     .addTo(mapa);
            // }
            // $('#mapa').html(marker); /* aqui se imprime el for, el cual son los multiples marcadores en el mapa*/
        }
    });
}

window.onload = cargar_mapa;