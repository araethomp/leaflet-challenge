// Store the API endpoint
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// GET request for queryUrl
d3.json(queryUrl).then(data => {
    //console.log(data);
    createFeatures(data.features);
});

// Make function to run for each feature then give each feature a descriptive popup
function createFeatures(earthquakeData) {
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3><h3>Location: " + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) +"</p>")
        },
        pointToLayer: function(feature, latlng) {
            return new L.circle(latlng, {
                radius: magSize(feature.properties.mag),
                fillColor: magsColor(feature.properties.mag),
                fillOpacity: .8
        })
    }
});

// Add earthquake layer to createMap 
createMap(earthquakes);
}


    
// Organize and assign colors according to magnitude 
function magsColor(d) {
    if (d <= 1) {
        return "Purple";
    } else if (d <= 2) {
        return "Blue";
    } else if (d <= 3) {
        return "Green";
    } else if (d <= 4) {
        return "Yellow";
    } else if (d <= 5) {
        return "Orange";
    } else if (d <=6) {
        return "Red";
    } else {
        return "Pink";
    }
};

// Use magnitudes to get radius of circles
function magSize(value) {
    return value*20000
};

// function circleSize(features, latlng){
//     let circles = {
//         radius: features.properties.mag * 10, 
//         fillColor: magsColor(feature.properties.mag),
//         color: magsColor(feature.properties.mag)
//     }
// }
//     // GeoJSON layer that holds the features array on the earthquakeData object then run the onEachFeature function for each piece of data
//     const earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature
//     });
//     const mags = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature,
//         layerPoint: (feature, latlng) => {
//             return new L.Circle(latlng, {
//                 radius: feature.properties.mag*20000, 
//                 fillOpacity: 2,
//                 stroke: false
//             });
//         }
//     });
//     // Add earthquakes layer
//     createMap(earthquakes, mags);
// }
// // Establish createMap function
// function createMap(earthquakes, mags) {
//     // Add layer options
//     const streetmapLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_key
//     });
//     const darkmapLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//        maxZoom: 18,
//        id: "dark-v10",
//        accessToken: API_key
//    }); 
//     // Create object to hold base layers
//     const baseMaps = {
//         "Street Map Layer": streetmapLayer,
//         "Dark Map Layer": darkmapLayer
//     };
//     // Create object to hold overlay layer
//     const overlayMaps = {
//         Earthquakes: earthquakes,
//         Magnitudes: mags
//     };
//     // Create map with streetmap layer and earthquake layers for the display on page load
//     const loadMap = L.map("map", {
//         center: [40, -98], 
//         zoom: 3,
//         layers: [streetmapLayer, earthquakes]
//     });
//     //  Create and add layer control, pass in baseMaps and overlayMaps
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(loadMap);
//     // Add legend
//     let legend = L.control(
//        { position: "bottomleft" }
//     )
//     legend.addTo(loadMap);
// }