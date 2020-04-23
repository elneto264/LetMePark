var mapa;
var tipo;

function cargar_mapa() {
    mapa = new L.Map('mapa', { zoomControl: true });
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttribution });
    mapa.setView(new L.LatLng(40.4165, -3.70256), 13).addLayer(layer_osm);
}

function elegirDireccion(lat, lng, tipo_osm) {

    var point = L.latLng(lat, lng);
    var bounds = point.toBounds(1400); 

    var l1 = bounds['_southWest']; 
    var l2 = bounds['_northEast']; 

    var lat1 = l1.lat;
    var lat2 = l2.lat;
    var lng1 = l1.lng;
    var lng2 = l2.lng;
        
    
    if (tipo) {
        mapa.removeLayer(tipo);
    }
    if (tipo_osm == "node") {
        tipo = L.circle(loc1, 25, { color: 'green', fill: false }).addTo(mapa);
        mapa.fitBounds(bounds);
        mapa.setZoom(18);
    } 
        
    else {
        var loc3 = new L.LatLng(lat1, lng2);
        var loc4 = new L.LatLng(lat2, lng1);
        tipo = L.polyline([l1, loc4, l2, loc3, l1], { color: 'none' }).addTo(mapa);
        
        circle = L.circle(point, 500, {
            color: 'green',
            fillOpacity: 0.1,
            weight: 1
        }).addTo(mapa);

        circleExterior = L.circle(point, 900, {
            color: 'red',
            fill: false,
            weight: 1
        }).addTo(mapa);

        mapa.fitBounds(bounds); 
    }
    
    valor(l1,l2);
}




function direccion_buscador() {
    var entrada = document.getElementById("direccion");

    $.getJSON('https://nominatim.OpenStreetMap.org/search?format=json&limit=5&q=' + entrada.value, function(data) {

        var direcciones = [];

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            direcciones.push("<li><a href='#' onclick='elegirDireccion(" + val.lat + ", " + val.lon  + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
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




function valor(loc1, loc2) {
    $.ajax({
        data: { 'lat1': loc1.lat, 'lon1': loc1.lng, 'lat2': loc2.lat, 'lon2': loc2.lng,},data: { 'lat1': loc1.lat, 'lon1': loc1.lng, 'lat2': loc2.lat, 'lon2': loc2.lng, },
        url: '/BusquedaAjax/',
        type: 'get',
        success: function(data) {

            var parkIcon = L.icon({
                iconUrl: '/static/img/car.png',
                iconSize: [35, 35],
            });





            for (var i = 0; i < data.length; i++) {

                var customPopup = "<div></div>";
                var customOptions = {
                    'maxWidth': '300',
                    'width': '100',
                    'className': 'popupCustom'
                };


                L.marker([data[i].fields.lat, data[i].fields.lon], { icon: parkIcon })
                    .bindPopup("<ul id='datoPop' class='list-group list-group-flush'>" +
                        "<li class='list-group-item'><b>Nombre:</b>" + " " + data[i].fields.name + "</li>" +
                        "<li class='list-group-item'><b>Dirección:</b>" + " " + data[i].fields.address + "</li>" +
                        "<li class='list-group-item'><b>lmpPID:</b>" + " " + data[i].fields.lmpPID + "</li>" +
                        "<li class='list-group-item'><b>Provider:</b>" + " " + data[i].fields.provider + "</li>" +
                        "<li class='list-group-item'><b>PID:</b>" + " " + data[i].fields.PID + "</li>" +
                        "<li class='list-group-item'><b>Longitud:</b>" + " " + data[i].fields.lon + "</li>" +
                        "<li class='list-group-item'><b>Latitud:</b>" + " " + data[i].fields.lat + "</li>" +
                        "<li class='list-group-item'><b>Pais:</b>" + " " + data[i].fields.country + "</li>" +
                        "<li class='list-group-item'><b>Región:</b>" + " " + data[i].fields.region + "</li>" +
                        "<li class='list-group-item'><b>Area:</b>" + " " + data[i].fields.area + "</li>" +
                        "<li class='list-group-item'><b>Who:</b>" + " " + data[i].fields.who + "</li>" +
                        "<li class='list-group-item'><b>Is_used:</b>" + " " + data[i].fields.is_used + "</li>" +
                        "<li class='list-group-item'><b>Cancelable:</b>" + " " + data[i].fields.cancelable + "</li>" +
                        "<li class='list-group-item'><b>Cancel_mn:</b>" + " " + data[i].fields.cancel_mn + "</li>" +
                        "<li class='list-group-item'><b>Cancel_msg:</b>" + " " + data[i].fields.cancel_msg + "</li>" +
                        "<li class='list-group-item'><b>Max_height:</b>" + " " + data[i].fields.max_height + "</li>" +
                        "<li class='list-group-item'><b>Hour_price:</b>" + " " + data[i].fields.hour_price + "</li>" +
                        "<li class='list-group-item'><b>Day_price:</b>" + " " + data[i].fields.day_price + "</li>" +
                        "<li class='list-group-item'><b>access_msg:</b>" + " " + data[i].fields.access_msg + "</li>" +
                        "<li class='list-group-item'><b>User_val:</b>" + " " + data[i].fields.user_val + "</li>" +
                        "<li class='list-group-item'><b>Lmp_val:</b>" + " " + data[i].fields.lmp_val + "</li>" +
                        "<li class='list-group-item'><b>Ben_val:</b>" + " " + data[i].fields.ben_val + "</li>" +
                        "<li class='list-group-item'><b>Gen_val:</b>" + " " + data[i].fields.gen_val + "</li>" +
                        "<li class='list-group-item'><b>Car_pc:</b>" + " " + data[i].fields.car_pc + "</li>" +
                        "<li class='list-group-item'><b>Human_pc:</b>" + " " + data[i].fields.human_pc + "</li>" +
                        "<li class='list-group-item'><b>Slug:</b>" + " " + data[i].fields.slug + "</li>" +
                        "<li class='list-group-item'><b>Booking Url:</b>" + " " + "<a target='_blank' href=" + data[i].fields.booking_url + ">" + data[i].fields.booking_url + "</a></li >" + "</ul>").addTo(mapa);
            }
        }

    });
}

window.onload = cargar_mapa;