/*document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    // Obtener los datos del localStorage
    const storedUsuario = localStorage.getItem('usuario');
    const storedContraseña = localStorage.getItem('contraseña');

    // Verificar si las credenciales coinciden
    if (usuario === storedUsuario && contraseña === storedContraseña) {
        // Almacenar la sesión y redirigir a la página principal
        sessionStorage.setItem('authenticated', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el nombre del usuario desde localStorage
    const userName = localStorage.getItem('usuario') || null;

    // Actualizar el elemento de la barra de navegación
    const usernameDisplay = document.getElementById('username-display');
    const userNavItem = document.getElementById('user-nav-item');

    if (userName) {
        // Reemplazar el enlace de login con el nombre del usuario
        usernameDisplay.textContent = `${userName}`;
        usernameDisplay.href = 'profile.html'; // Opcional: redirige al perfil del usuario
        userNavItem.classList.add('nav-item'); // Asegura que el elemento tiene la clase de nav-item
    } else {
        // Si no hay usuario, mantener el enlace de login
        usernameDisplay.textContent = 'Login';
        usernameDisplay.href = 'login.html'; // Asegura que el enlace de login funciona
    }
});*/
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el nombre de usuario desde sessionStorage o localStorage
    const userName = sessionStorage.getItem('username') || localStorage.getItem('username') || null;

    // Obtener el elemento de la barra de navegación
    const userNameElement = document.getElementById('user-name');

    if (userName) {
        // Reemplazar el texto de 'Login' por el nombre del usuario
        userNameElement.textContent = `Hola, ${userName}`;
        userNameElement.href = 'profile.html'; // Opcional: redirige al perfil del usuario
    } else {
        // Si no hay nombre de usuario, mostrar el enlace de login
        userNameElement.textContent = 'Login';
        userNameElement.href = 'login.html';
    }
});



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
