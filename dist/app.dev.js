"use strict";

mapboxgl.accessToken = "pk.eyJ1IjoiY2hlc2hpcmVrYXRzbWlsZSIsImEiOiJjbGVoNWZ1eHgxN2JlM3NvMHc5YzBjczV0In0.zFDkGL0zUKKJKyoGFXXsCQ"; //const map = new mapboxgl.Map({
//  container: "map",
//  style: "mapbox://styles/mapbox/streets-v11",
// center: [-71.092761, 42.357575],
//  zoom: 13,
//});

var marker = new mapboxgl.Marker().setLngLat([-71.092761, 42.357575]).addTo(map);
var busStops = [[-71.093729, 42.359244], [-71.094915, 42.360175], [-71.0958, 42.360698], [-71.099558, 42.362953], [-71.103476, 42.365248], [-71.106067, 42.366806], [-71.108717, 42.368355], [-71.110799, 42.369192], [-71.113095, 42.370218], [-71.115476, 42.372085], [-71.117585, 42.373016], [-71.118625, 42.374863]];
var counter = 0;

function move() {
  setTimeout(function () {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
} //var map;


var markers = []; // load map

function init() {
  var myOptions = {
    zoom: 14,
    center: {
      lat: 42.35335,
      lng: -71.091525
    } //mapTypeId: google.maps.MapTypeId.ROADMAP,

  };
  var element = document.getElementById("map");
  map = new mapboxgl.Map(element, myOptions);
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
          url = "https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip";
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
    return "red.png";
  }

  return "blue.png";
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