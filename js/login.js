/*document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    // agarra los datos del local storage y los guarda  
    const storedUsuario = localStorage.getItem('usuario');
    const storedContraseña = localStorage.getItem('contraseña');

    if (usuario === storedUsuario && contraseña === storedContraseña) {
        // se almacena la sesion en local storage y lleva al index
        sessionStorage.setItem('authenticated', 'true');

        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});
*/

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;

  // Obtener los datos del localStorage
  const storedUsuario = localStorage.getItem('usuario');
  const storedContraseña = localStorage.getItem('contraseña');

  if (usuario === storedUsuario && contraseña === storedContraseña) {
    // Almacenar la sesión y el nombre de usuario en sessionStorage
    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('username', usuario);

    // Redirigir a la página de inicio
    window.location.href = 'index.html';
  } else {
    alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
  }
});
