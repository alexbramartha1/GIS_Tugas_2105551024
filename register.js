const apiUrl = 'http://api_2105551024.local.net/api/register';

const contactForm = document.getElementById('dataForm');

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

contactForm.addEventListener('submit', function (event) {
    const username = document.getElementById('inputUsername').value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    if (!isValidEmail(email)) {
        event.preventDefault(); // Mencegah pengiriman formulir jika email tidak valid
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = ''; // Hapus pesan kesalahan jika email valid
        if (String(password).length < 6) {
          event.preventDefault(); // Mencegah pengiriman formulir jika email tidak valid
          passwordError.textContent = 'Please enter a valid at least 6 character.';
        } else {
          passwordError.textContent = ''; // Hapus pesan kesalahan jika email valid
        
        const data = {
          name: username,
          email: email,
          password: password
        };
    
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
    
        fetch(apiUrl, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Mengubah respon menjadi JSON
          })
          .then(data => {
            if (data.message == "User created successfully") {
              alert(data.message);
              window.location.href = "login.html"; // Mengarahkan ke halaman login jika login berhasil
            } else {
              alert(data.error.email); // Menampilkan pesan kesalahan jika ada
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
    }
});
