"use strict";

mapboxgl.accessToken = "pk.eyJ1IjoiY2hlc2hpcmVrYXRzbWlsZSIsImEiOiJjbGVoNWZ1eHgxN2JlM3NvMHc5YzBjczV0In0.zFDkGL0zUKKJKyoGFXXsCQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.092761, 42.357575],
  zoom: 13
});
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
}

function run() {
  var locations;
  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getBusLocations());

        case 2:
          locations = _context.sent;
          console.log(new Date());
          console.log(locations);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
} //timer


setTimeout(run, 15000);

function getBusLocations() {
  var url, response, json;
  return regeneratorRuntime.async(function getBusLocations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
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

run();