// formulario login
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;

  const storedUsuario = localStorage.getItem('usuario');
  const storedContraseña = localStorage.getItem('contraseña');

  if (usuario === storedUsuario && contraseña === storedContraseña) {
    // Cambios nuevos por profile, guardar en localStorage que el usuario está logueado
    localStorage.setItem('loggedInUser', usuario); // Aquí se usa el email o el nombre de usuario
    localStorage.setItem('email', usuario); // Guardar el email/usuario para usar en otras páginas

    window.location.href = 'index.html'; // Redirigir al inicio.
  } else {
    alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
  }
});

// cambios nuevos: aviso si el usuario no está registrado
document.addEventListener('DOMContentLoaded', function () {
  const storedUsuario = localStorage.getItem('usuario');
  const storedContraseña = localStorage.getItem('contraseña');

  if (!storedUsuario || !storedContraseña) {
    const mensajeRegistro = document.getElementById('mensaje-registro');
    mensajeRegistro.textContent =
      'No estás registrado. Por favor, regístrate para continuar.';
    mensajeRegistro.style.color = 'red';
  }
});

