"use strict";

var map;
var markers = []; // load map

function init() {
  var myOptions = {
    zoom: 14,
    center: {
      lat: 42.353350,
      lng: -71.091525
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var element = document.getElementById('map');
  map = new google.maps.Map(element, myOptions);
  addMarkers();
} // Add bus markers to map


function addMarkers() {
  var locations;
  return regeneratorRuntime.async(function addMarkers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getBusLocations());

        case 2:
          locations = _context.sent;
          // loop through data, add bus markers
          locations.forEach(function (bus) {
            var marker = getMarker(bus.id);

            if (marker) {
              moveMarker(marker, bus);
            } else {
              addMarker(bus);
            }
          }); // timer

          console.log(new Date());
          setTimeout(addMarkers, 15000);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
} // Request bus data from MBTA


function getBusLocations() {
  var url, response, json;
  return regeneratorRuntime.async(function getBusLocations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context2.sent;
          return _context2.abrupt("return", json.data);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function addMarker(bus) {
  var icon = getIcon(bus);
  var marker = new google.maps.Marker({
    position: {
      lat: bus.attributes.latitude,
      lng: bus.attributes.longitude
    },
    map: map,
    icon: icon,
    id: bus.id
  });
  markers.push(marker);
}

function getIcon(bus) {
  // select icon based on bus direction
  if (bus.attributes.direction_id === 0) {
    return 'red.png';
  }

  return 'blue.png';
}

function moveMarker(marker, bus) {
  // change icon if bus has changed direction
  var icon = getIcon(bus);
  marker.setIcon(icon); // move icon to new lat/lon

  marker.setPosition({
    lat: bus.attributes.latitude,
    lng: bus.attributes.longitude
  });
}

function getMarker(id) {
  var marker = markers.find(function (item) {
    return item.id === id;
  });
  return marker;
}

window.onload = init;