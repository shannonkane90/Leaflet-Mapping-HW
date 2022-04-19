// Create our map, giving it the streetmap and earthquakes layers to display on load. 
//Lat/Long is the middle of the US

// var myMap;
var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    // layers:[street]

// Create the base layers.
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);




// var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });


// // Create a baseMaps object.
// var baseMaps = {
//     "Street Map": street
// };

// // Create a layer control.
// // Pass it our baseMaps and overlayMaps.
// // Add the layer control to the map.
// L.control.layers(baseMaps,{
//     collapsed:false
// })
//     .addTo(myMap);


//Magnitude= size and depth=color; 
function getradius(mag) {
    if (mag > 4) {
        return 35;
    } else if (mag >= 3) {
        return 15;
    } else if (mag >= 2) {
        return 10;
    } else {
        return 5
    }
}
//Color code for depth; depth is the third in list of "coordinates" "coordinates[2]")
function getcolor(depth) {
    if (depth > 90) {
        return "red";
    } else if (depth > 70) {
        return "orange";
    } else if (depth >= 50) {
        return "yellow";
    } else if (depth >= 30) {
        return "green";
    } else if (depth >= 10) {
        return "blue";
    } else {
        return "purple"
    }
}
function getstyle(feature) {
        return {
            color: "black",
            fillopacity: 0.7,
            radius: getradius(feature.properties.mag),
            fillColor: getcolor([feature.geometry.coordinates[2]]),
            weight: 1.5,
        };
    }


    // //create the legend
    // var legend= L.control({position: 'bottomleft'});
    // legend.onAdd-function(map){

    // var div = L.DomUtil.create('div', 'info legend');
    //     labels=[],
    //     depth= [];
    // for (var i=0; i< depth.length; i++)
    // }
    // //

    // function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature (radius + colors) a popup that describes the place and time of the earthquake.
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup('<h3>Location: ' + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag + "</h3>Date: " + new Date(feature.properties.time));



    // Store our API endpoint as queryUrl. (All Earthquakes from past 7 days)
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//     // Getting our GeoJSON data
d3.json(
    queryUrl
    ).then(function (data) {
        // Creating a GeoJSON layer with the retrieved data
    console.log(data);
    L.geoJson(data, {
        pointToLayer: (feature, coord) => {
            return L.circleMarker(coord);
        },
        style: getstyle,
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<h3> ${feature.properties.place
                } </h3><b>Magnitude:</b> ${feature.properties.mag}
    <br /><b>Depth:</b> ${[feature.geometry.coordinates[2]]}`);
        },
    }).addTo(myMap);
});