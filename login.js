const apiUrl = 'http://api_2105551024.local.net/api/login';

const contactForm = document.getElementById('dataForm');
var token = localStorage.getItem('token');

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

if (!token) {
  contactForm.addEventListener('submit', function (event) {
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
      
          event.preventDefault();
      
          fetch(apiUrl, requestOptions)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.text();
            })
            .then(data => {
              // responseMessage.textContent = data;
              dataObj = JSON.parse(data)
              token_user = dataObj.data.token
              alert(dataObj.message)
        
              if (dataObj.message == "Login successfully") {
                localStorage.setItem('token', token_user);
                window.location.href = "index.html";
              }
        
            })
            .catch(error => {
              console.error('Error:', error);
            });
          }
    }
  });
} else {
  window.location.href = "index.html";
}

