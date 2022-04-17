// Store our API endpoint as queryUrl. (All Earthquakes from past 7 days)
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup('<h3>Location: ' + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag +  "</h3>Date: " + new Date(feature.properties.time));
    
}
    //MARKERS!
  // Create a GeoJSON layer that contains the features array (are these the markers?) on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  //Lat/Long is the middle of the US
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


//   Create a Legend
}

//From City Population Classwork
// Loop through the cities array, and create one marker for each city object.
for (var i = 0; i < cities.length; i++) {
    L.circle(cities[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(cities[i].population)
    }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  }

//Magnitude= size and depth=color; depth is the third in list of "coordinates" "coordinates[2]"
//Color code
function getradius(mag){
    if (mag >4){
        return 35;
    }else if (mag >= 3) {
        return 15;
    }else if (mag>= 2){
    }return 10;{
    else {
        return 5}
    }

function getcolor(depth){

}
function getstyle(feature){
    return{
        color:"black",
        fillopacity:0.7,
        radius: getradius(feature.properties.mag),
        fillColor: getcolor([feature.geometry.coordinates[2]]),
        weight: 1.5,
    };
}
//Create GEOJSON layer
L.geoJSON(Data,{
    pointToLayer:(feature,coord)=> {
        return L.circleMarker(coord);
    },
    style:getstyle,
    onEachFeature:(feature, layer) => {
        layer.bindPopup('<h3'$(
            feature.properties.place
        } </h3><b>Magnitude;</b>$(feature.properties.mag}
        <br> />Depth:</br> ${[feature.geometry.coordinates[2]]''};
},
}).addTo(myMap);

//legend
var legent= L.control({position: 'bottomleft'});
legend.onAdd-function(map){
   
var div = L.DomUtil.create('div', 'info legend');
    labels=[],
    depth= [];
for (var i=0; i< depth.length; i++)
}
//
