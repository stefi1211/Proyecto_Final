/*document.addEventListener('DOMContentLoaded', () => {
  const userName =
    sessionStorage.getItem('userName') ||
    localStorage.getItem('userName') ||
    null;

  const userDropdown = document.getElementById('userDropdown');

  if (userName) {
    userDropdown.innerHTML = `<strong>Hola!</strong> ${userName}`;
    userDropdown.href = 'my-profile.html'; 
  } else {
    userDropdown.textContent = 'Login';
    userDropdown.href = 'login.html';
  }
});*/
document.addEventListener('DOMContentLoaded', () => {
  // Obtiene el nombre del usuario desde localStorage
  const userName = localStorage.getItem('usuario') || null;
  const userDropdown = document.getElementById('userDropdown');

  if (userName) {
      // Cambia el texto del enlace a "Hola, [nombre del usuario]"
      userDropdown.innerHTML = `<strong>Hola!</strong> ${userName}`;
  } else {
      // Si no hay nombre, muestra "Login" en el menú
      userDropdown.textContent = 'Login';
      userDropdown.href = 'login.html'; // Redirige al login
  }

  // Evento de cerrar sesión
  const logoutBtn = document.querySelector('.dropdown-item[href="login.html"]');
  if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
          // Elimina el nombre del usuario del almacenamiento
          localStorage.removeItem('usuario');
          // Redirige al login
          window.location.href = 'login.html';
      });
  }
});
