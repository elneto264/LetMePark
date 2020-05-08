function cargarMapa() {
    // Ubicacion actual
    var madrid = {
        lat: 40.4381311,
        lng: -3.8196228
    };

    // Aqui se centrar el mapa
    var map = new google.maps.Map(
        document.getElementById('mapa'), {
            zoom: 10,
            center: madrid
        });

    // El marcador, posicionado en  la ubicacion dada
    var marker = new google.maps.Marker({
        position: madrid,
        map: map
    });


    //autocompletar del proyecto de nosotros--------------------------------------------------------------

    var input = document.getElementById('direccion');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            console.log("Returned place contains no geometry autocompletar");

            return;
        }

        var bounds = new google.maps.LatLngBounds();

        marker.setPosition(place.geometry.location);

        if (place.geometry.viewport) {
            console.log("entro al if del geometry autocompletar");
            bounds.union(place.geometry.viewport);
            marker.setMap(map);
        } else {
            console.log("entro al else autocompletar");
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);

        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();

        console.log("Lat, lon autocomplete " + lat + lng);

        map.setCenter(new google.maps.LatLng(lat, lng));

        var radio = 500;

        var circle = new google.maps.Circle({
            center: map.getCenter(),
            radius: radio
        });

        var bounds = circle.getBounds();
        map.fitBounds(bounds);

        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();

        var minLat = southWest.lat();
        var minLon = southWest.lng();
        var maxLat = northEast.lat();
        var maxLon = northEast.lng();


        //llamada ajax-------------------------------------------------------------------------------
        ConsultaAjax(minLat, minLon, maxLat, maxLon);

        ////////Ajax ys sus variables


    });

    //caja buscador(searchBox) del proyecto------------------------------------------------------------------------------


    var searchBox = new google.maps.places.SearchBox(input);
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', function() {
        var palabra = searchBox.getPlaces();
        if (palabra.length == 0) {
            return;
        }

        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        palabra.forEach(function(palabra) {
            if (!palabra.geometry) {
                console.log("Returned place contains no geometry buscador");
                return;
            }

            markers.push(new google.maps.Marker({
                map: map,
                position: palabra.geometry.location
            }));

            if (palabra.geometry.viewport) {

                console.log(" entro al if del geometry buscador");
                bounds.union(palabra.geometry.viewport);

                marker.setMap(map);
            } else {
                console.log("Else geometry buscador");
                bounds.extend(palabra.geometry.location);
            }
        });
        map.fitBounds(bounds);
        console.log("Bounds: " + bounds);


    });






}





function ConsultaAjax(minLat, minLon, maxLat, maxLon) {
    var madrid = {
        lat: 40.4381311,
        lng: -3.8196228
    };

    // Aqui se centrar el mapa
    var map = new google.maps.Map(
        document.getElementById('mapa'), {
            zoom: 10,
            center: madrid
        });

    // El marcador, posicionado en  la ubicacion dada
    var marker = new google.maps.Marker({
        position: madrid,
        map: map
    });

    var icon = {
        url: "/static/img/car.png", // url
        scaledSize: new google.maps.Size(25, 25), // tamaño a escala
        origin: new google.maps.Point(0, 0), // originen
        //anchor: new google.maps.Point(0, 0)
    };

    $.ajax({

        data: {
            'lat1': minLat,
            'lon1': minLon,
            'lat2': maxLat,
            'lon2': maxLon,
        },
        url: '/BusquedaAjax/',
        type: 'get',

        success: function(data) {

            console.log("consulta hecha")
            var infowindow = new google.maps.InfoWindow;
            var marker, i;

            for (var i = 0; i < data.length; i++) {
                //pinta los marcadores
                marker = new google.maps.Marker({
                    position: {
                        lat: data[i].fields.lat,
                        lng: data[i].fields.lon
                    },
                    map: map,
                    icon: icon
                });
                //escucha un evento  y tiene una función para llamar cuando ocurre el evento especificado. en este caso cuando ocurre el evento click en el marcador, pinta el globo con la informacion de dicho marcador
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent("<ul id='datoPop' class='list-group list-group-flush'>" +
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
                            "<li class='list-group-item'><b>Booking Url:</b>" + " " + "<a target='_blank' href=" + data[i].fields.booking_url + ">" + data[i].fields.booking_url + "</a></li >" + "</ul>");
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

        }
    });
}




//window.onload = cargarMapa;