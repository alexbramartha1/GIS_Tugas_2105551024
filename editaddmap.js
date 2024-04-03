document.getElementById("back").addEventListener("click", function() {
    window.location.href = "index.html";
}); 

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

var nameRumahSakit = localStorage.getItem('nameRumahSakit');
var id_state = localStorage.getItem('id_state');
const dataForm = document.getElementById("dataForm");

if(nameRumahSakit !== null && id_state !== '0') {
    database.ref("rumah_sakit_place").orderByChild('name').equalTo(nameRumahSakit).on('value', function(snapshot) {
        // Loop melalui hasil query
        snapshot.forEach(function(childSnapshot) {
            // Mendapatkan data dari snapshot
            var data = childSnapshot.val();
    
            // Mengisi nilai input dengan data dari Firebase
            document.getElementById('inputAlamat').value = data.alamat;
            document.getElementById('inputLatitude').value = data.latitude;
            document.getElementById('inputLongitude').value = data.longitude;
            document.getElementById('inputNama').value = data.name;
            document.getElementById('inputPhoto').value = data.photo;
            
            dataForm.addEventListener("submit", function(event) {
                event.preventDefault(); // Hindari pengiriman formulir default

                var newData = {
                    alamat: document.getElementById("inputAlamat").value,
                    photo: document.getElementById("inputPhoto").value,
                    name: document.getElementById("inputNama").value,
                    latitude: document.getElementById("inputLatitude").value,
                    longitude: document.getElementById("inputLongitude").value
                }; 

                var childRef = childSnapshot.ref;
            
                childRef.update(newData)   
            
                // Bersihkan formulir setelah pengiriman
                dataForm.reset();
            });
        });
    });
} 

else {
    dataForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Hindari pengiriman formulir default
    
        const name = document.getElementById("inputNama").value;
        const alamat = document.getElementById("inputAlamat").value;
        const photo = document.getElementById("inputPhoto").value;
        const latitude = document.getElementById("inputLatitude").value;
        const longitude = document.getElementById("inputLongitude").value;
        
        // Simpan data ke Firebase
        database.ref("rumah_sakit_place").push({
            alamat: alamat,
            latitude: latitude,
            longitude: longitude,
            name: name,
            photo: photo
        });
        
        // Bersihkan formulir setelah pengiriman
        dataForm.reset();
    });
}

function clearAllInputs() {
    // Mendapatkan semua elemen input di dokumen
    var inputFields = document.querySelectorAll('input[type="text"]');
    
    // Mengatur nilai semua elemen input menjadi string kosong
    inputFields.forEach(function(input) {
        input.value = '';
    });
}