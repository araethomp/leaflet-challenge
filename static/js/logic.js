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

// Add earthquakes to createMap 
createMap(earthquakes);
}

// Create map and add layers 
function createMap(earthquakes) {
    
    // Bring in layers
    let lightmapLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    let darkmapLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox/dark-v10",
        accessToken: API_KEY
    });

    // Create base layer object to hold layers
    let baseMaps = {
        "Light Map Layer": lightmapLayer,
        "Dark Map Layer": darkmapLayer
    };

    // Create overlay object to hold overlays
    let overlayMaps = {
        "Earthquakes": earthquakes 
    }

    // Create map, assign layers and start points
    const earthquakeMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 3,
        layers: [lightmapLayer, earthquakes]
    });

    // Add layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(earthquakeMap);

    // Create legend
    let legend = L.control({
        position: "bottomright"
    });
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
