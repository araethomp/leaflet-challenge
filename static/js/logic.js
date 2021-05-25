// Store the API endpoint
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

// GET request for queryUrl
d3.json(queryUrl).then(data => {
    console.log(data);
    console.log(d3.extent(data.features.map(d => d.properties.mag)))
    makeFeatures(data.features);
});

// Make function to run for each feature then give each feature a descriptive popup
function makeFeatures(earthquakeInfo) {
    function eachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
    // GeoJSON layer that holds the features array on the earthquakeInfo object then run the eachFeature function for each piece of data
    const earthquakes = L.geoJSON(earthquakeInfo, {
        eachFeature: eachFeature
    });

    const mags = L.geoJSON(earthquakeInfo, {
        eachFeature: eachFeature,
        layerPoint: (feature, latlng) => {
            return new L.Circle(latlng, {
                radius: feature.properties.mag*20000, 
                fillColor: "blue",
                stroke: false
            });
        }
    });
    
}