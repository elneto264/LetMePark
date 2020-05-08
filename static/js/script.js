function cargarMapa() {

    var madrid = new google.maps.LatLng(40.416775, -3.703790);

    mapa = new google.maps.Map(document.getElementById('mapa'), {
        center: madrid,
        zoom: 15
    });

    // var request = {
    //     location: madrid,
    //     radius: '500',
    //     types: ['store']
    // };

    // service = new google.maps.places.PlacesService(mapa);
    // service.nearbySearch(request, callback);

    //Variables para autocompletar y el searchBox
    var input = document.getElementById('direccion');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var searchBox = new google.maps.places.SearchBox(input);
    var marker = new google.maps.Marker({
        mapa: mapa
    });


    //autocompletar-----------------------------------------------------------------------


    // Bias the SearchBox results towards current map's viewport.
    autocomplete.bindTo('bounds', mapa);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'name']);

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Returned place contains no geometry autocompletar");

            return;
        }
        var bounds = new google.maps.LatLngBounds();
        console.log(bounds);
        marker.setPosition(place.geometry.location);

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            console.log("entro al if del geometry autocompletar");
            bounds.union(place.geometry.viewport);
            marker.setMap(mapa);
        } else {
            console.log("entro al else autocompletar");
            bounds.extend(place.geometry.location);
        }
        mapa.fitBounds(bounds);
    });


    //caja buscador(searchBox)-------------------------------------------------------------------------------


    // Bias the SearchBox results towards current map's viewport.
    mapa.addListener('bounds_changed', function() {
        searchBox.setBounds(mapa.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry buscador");
                return;
            }

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                mapa: mapa,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.

                console.log(" entro al if del geometry buscador");
                bounds.union(place.geometry.viewport);
                console.log(bounds)
                marker.setMap(mapa);
            } else {
                console.log("Else geometry buscador");
                bounds.extend(place.geometry.location);
            }
        });
        mapa.fitBounds(bounds);
    });




    // function callback(results, status) {
    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //         for (var i = 0; i < results.length; i++) {
    //             console.log(results[i]);
    //         }
    //     }
    // }

    //latitud y longitud del lugar buscado
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    mapa.setCenter(new google.maps.LatLng(lat, lng));

    //radio in metros
    var radio = 500;

    /* crea el circulo basado en el radio dado */
    var circle = new google.maps.Circle({
        center: mapa.getCenter(),
        radius: radio
    });

    //Nuevos limites del circulo
    var bounds = circle.getBounds();
    /* Ajuste el mapa al tamaño del círculo. Será un poco más grande que el círculo ya que la API agrega un poco de relleno */
    mapa.fitBounds(bounds);

    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();

    //obtener lat y longitd de los limites para enviarlo a la view
    var minLat = southWest.lat();
    var minLon = southWest.lng();

    var maxLat = northEast.lat();
    var maxLon = northEast.lng();
    //imagen del icono
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
                    title: "Nombre:" + " " + data[i].fields.name + "<br>" + "Dirección:" + " " + data[i].fields.address,
                    mapa: mapa,
                    icon: icon
                });
                //escucha un evento  y tiene una función para llamar cuando ocurre el evento especificado. en este caso cuando ocurre el evento click en el marcador, pinta el globo con la informacion de dicho marcador
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent("Nombre:" + " " + data[i].fields.name + "<br>" + "Dirección:" + " " + data[i].fields.address);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    });


} //cargar mapa

window.onload = cargarMapa;