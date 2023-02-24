"use strict";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hlc2hpcmVrYXRzbWlsZSIsImEiOiJjbGVoNWZ1eHgxN2JlM3NvMHc5YzBjczV0In0.zFDkGL0zUKKJKyoGFXXsCQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.092761, 42.357575],
  zoom: 13,
});

var marker = new mapboxgl.Marker()
  .setLngLat([-71.092761, 42.357575])
  .addTo(map);

const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.115476, 42.372085],
  [-71.118625, 42.374863],
];

var counter = 0;
function move() {
  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
}
