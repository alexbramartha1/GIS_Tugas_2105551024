var map = L.map('map').setView([-8.8008012, 115.1612023], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.getCurrentPosition(position => {
    const { coords: { latitude, longitude }} = position;

    var myIcon = L.icon({
        iconUrl: 'icon/your_loc.png',
        iconSize: [35, 40],
        iconAnchor: [16, 10],
    });
    
    var marker = new L.marker([latitude, longitude], {
    draggable: false,
    icon: myIcon,
    autoPan: true
    }).addTo(map);

    map.setView([latitude, longitude], 10);

    marker.bindPopup("<b>You're here!").openPopup();
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

// var locations = [
//     {lat: -8.678399, lng: 115.214287, name: 'Rumah Sakit Prima Medika'},
//     {lat: -8.7098015, lng: 115.2074638, name: 'Bali International Hospital'}
// ];

const firebaseConfig = {
    apiKey: "AIzaSyDfwI3e0KJTEfkr-wgr4x85Vqf-7o1O9R0",
    authDomain: "geographic-task-b435f.firebaseapp.com",
    databaseURL: "https://geographic-task-b435f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "geographic-task-b435f",
    storageBucket: "geographic-task-b435f.appspot.com",
    messagingSenderId: "222507816578",
    appId: "1:222507816578:web:053cb8d49a73774bc5c69b",
    measurementId: "G-V2VV9SPMTB"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

database.ref("rumah_sakit_place").on("value", getData);

function getData(snapshoot) {
    snapshoot.forEach((element) => {
        var data = element.val();
        
        var myIcon = L.icon({
            iconUrl: 'icon/hospital_loc.png',
            iconSize: [35, 40],
            iconAnchor: [16, 10],
        });

        var marker = L.marker([data.latitude, data.longitude],{
            icon: myIcon
            }).addTo(map);
        marker.bindPopup(data.name).openPopup();;

        // Function to show the overlay
        function showOverlay() {
            document.getElementById('overlayImage').src = data.photo;
            document.getElementById('overlayTitle').textContent = data.name;
            document.getElementById('overlayDescription').textContent = data.alamat;
            document.getElementById('overlay').style.display = 'block';
        }

        // Function to hide the overlay
        function hideOverlay() {
            document.getElementById('overlay').style.display = 'none';
        }

        // Add a click event listener to the marker
        marker.on('click', function() {
            showOverlay();
        });

        // Close the overlay when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target == document.getElementById('overlay')) {
                hideOverlay();
            }
        });
    });
}

// locations.forEach(location => {
//     var marker = L.marker([location.lat, location.lng]).addTo(map);
//     marker.bindPopup(location.name).openPopup();;

//     // Function to show the overlay
//     function showOverlay() {
//         document.getElementById('overlayTitle').textContent = location.name;
//         document.getElementById('overlayDescription').textContent = location.lat, location.lng;
//         document.getElementById('overlay').style.display = 'block';
//     }

//     // Function to hide the overlay
//     function hideOverlay() {
//         document.getElementById('overlay').style.display = 'none';
//     }

//     // Add a click event listener to the marker
//     marker.on('click', function() {
//         showOverlay();
//     });

//     // Close the overlay when clicking outside of it
//     window.addEventListener('click', function(event) {
//         if (event.target == document.getElementById('overlay')) {
//             hideOverlay();
//         }
//     });
// });

window.onscroll = function() {scrollFunction()};
    
function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
