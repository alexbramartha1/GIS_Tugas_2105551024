var map = L.map('map').setView([-8.8008012, 115.1612023], 20);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.getCurrentPosition(position => {
    const { coords: { latitude, longitude }} = position;
    var marker = new L.marker([latitude, longitude], {
    draggable: false,
    autoPan: true
    }).addTo(map);

    map.setView([latitude, longitude], 20);

    var myIcon = L.icon({
        iconUrl: 'icon.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    marker.bindPopup("<b>Hello, you're here!").openPopup();
    console.log(marker);
})

var popup = L.popup()
    .setLatLng([-8.8008012, 115.1612023])
    .setContent("I am a standalone popup.")
    .openOn(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

var circle = L.circle([-8.8008012, 115.1612023], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle.bindPopup("Danger Area!");

var locations = [
    {lat: -8.342, lng: 115.508, name: 'Gunung Agung'},
    {lat: -8.242, lng: 115.375, name: 'Gunung Batur'}
];

locations.forEach(location => {
    var marker = L.marker([location.lat, location.lng]).addTo(map);
    marker.bindPopup(location.name).openPopup();;
});