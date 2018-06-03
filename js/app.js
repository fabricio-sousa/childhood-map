// Global variables. Empty array for markers and infoWindow variable.
var markers = [];
var infoWindow;

// This function allows for the Google Map to be rendered as well as all markers to be created.
function initMap() {

    // Styles array for Google Maps.
    var styles = [
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#FFA800"
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#679714"
                },
                {
                    "saturation": 33.4
                },
                {
                    "lightness": -25.4
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#53FF00"
                },
                {
                    "saturation": -73
                },
                {
                    "lightness": 40
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#FBFF00"
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#00FFFD"
                },
                {
                    "lightness": 30
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#00BFFF"
                },
                {
                    "saturation": 6
                },
                {
                    "lightness": 8
                },
                {
                    "gamma": 1
                }
            ]
        }
    ]
  
    // Constructor creates a new map.
    map = new google.maps.Map(document.getElementById('map'), {
  
      zoom: 9,
      styles: styles,
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.BOTTOM_CENTER
          }
    });

    // Declare a new geocoder object.
    var geocoder = new google.maps.Geocoder();

    // For each park in Parks, call the geocodePark function which geocodes the addresses.
    Parks.forEach(function(park) {
        geocodePark(geocoder, park, map);
    });

    // Declare a new infoWindow object.
    infoWindow = new google.maps.InfoWindow();

    // Apply all KnockOut Bindings.
    ko.applyBindings(new ViewModel());

}

// This function allows each marker to be clicked triggering a google maps marker event.
function clickMarker(name) {
	markers.forEach(function(markerItem) {
		if (markerItem.name == name) {
			google.maps.event.trigger(markerItem.marker, 'click');
		}
	});
}

// Google Maps API error handling.
function apiError() {
	alert("There was an issue loading the Google Maps API.");
}