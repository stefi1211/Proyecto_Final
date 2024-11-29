document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const contraseña = document.getElementById('contraseña').value.trim();

  if (usuario !== '' && contraseña !== '') {
      const loginData = {
          username: usuario,
          password: contraseña
      };

      fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
      })
      .then(response => response.json())
      .then(data => {
          if (data.token) {
              localStorage.setItem('token', data.token);  
              window.location.href = 'index.html'; 
          } else {
              alert('Error en el login: ' + (data.message || 'Inténtalo nuevamente.'));
          }
      })
      .catch(error => {
          console.error('Error al iniciar sesión:', error);
          alert('Hubo un problema con el login. Por favor, intenta nuevamente.');
      });
  } else {
      alert('Por favor, complete todos los campos.');
  }
});
