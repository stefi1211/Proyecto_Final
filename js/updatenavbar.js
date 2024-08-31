// updateNavBar.js

document.addEventListener('DOMContentLoaded', () => {
  // Obtener el nombre de usuario desde sessionStorage o localStorage
  const userName =
    sessionStorage.getItem('username') ||
    localStorage.getItem('username') ||
    null;

  // Obtener el elemento de la barra de navegación
  const userLink = document.getElementById('user-link');

  if (userName) {
    // Reemplazar el texto de 'Login' por el nombre del usuario y hacerlo un enlace al perfil
    userLink.textContent = `${userName}`;
    userLink.href = 'profile.html'; // Redirige al perfil del usuario o a otra página
  } else {
    // Si no hay nombre de usuario, mostrar el enlace de login
    userLink.textContent = 'Login';
    userLink.href = 'login.html';
  }
});
