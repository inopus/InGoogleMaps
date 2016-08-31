function InGoogleMaps(mapEle, buscaEle) {
    // versão: 2
    this.location = new Object();
    this.lat = undefined;
    this.lng = undefined;
    this.mapEle = undefined;
    this.map = undefined;
    this.buscaEle = undefined;
    this.buscaAutocomplete = undefined;
    this.marker = new Array();
    this.markerIcon = {
        path: 'M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z',
        fillColor: 'blue',
        fillOpacity: 0.85,
        scale: 1,
        strokeColor: 'black',
        strokeWeight: 1
    }

    this.place_changed = function () {
        this.map.setCenter({
            lat: this.lat,
            lng: this.lng
        });
        this.map.setZoom(15);
        if (this.marker.length == 0) {
            (function (_this) {
                // aqui posso passar também um icon no Marker()
                _this.marker.push(new google.maps.Marker({
                    position: _this.map.getCenter(),
                    map: _this.map
                }));
            })(this);
        } else {
            this.marker[0].setPosition(new google.maps.LatLng(this.lat, this.lng));
        }
        console.log(this.lat);
        console.log(this.lng);
    }

    this.construtor = function (mapEle, buscaAutocomplete) {
        this.mapEle = mapEle;
        if (this.mapEle) {
            this.map = new google.maps.Map(this.mapEle, {
                center: {
                    lat: -23.550519899999998,
                    lng: -46.633309399999995
                },
                zoom: 3
            });
            (function (_this) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (i) {
                        _this.lat = i.coords.latitude;
                        _this.lng = i.coords.longitude;
                        _this.place_changed();
                    }, function (e) {
                        console.log("Não foi possível busca a sua localização.");
                        console.log(e);
                    }, {
                        enableHighAccuracy: true,
                        timeout: 12000,
                        maximumAge: 0
                    });
                }
            })(this);

            this.buscaEle = buscaEle;
            if (this.buscaEle) {
                this.buscaAutocomplete = new google.maps.places.Autocomplete(this.buscaEle, {
                    types: ['geocode']
                });
                (function (_this, ba) {
                    ba.addListener('place_changed', function () {
                        if (this.getPlace().geometry) {
                            _this.lat = this.getPlace().geometry.location.lat();
                            _this.lng = this.getPlace().geometry.location.lng();
                            _this.place_changed();
                        } else {
                            alert("Você precisa selecionar uma das opções para localizarmos a posição desejada.");
                        }
                    });
                })(this, this.buscaAutocomplete);
            }
        }
    }

    this.construtor(mapEle);
}