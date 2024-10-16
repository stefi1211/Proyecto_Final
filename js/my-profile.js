document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');

  // Si no hay usuario logueado, redirigir a la página de login
  if (!loggedInUser) {
    alert('Por favor, inicie sesión para acceder a su perfil.');
    window.location.href = 'login.html'; // Redirigir al login
    return;
  }

  const emailField = document.getElementById('email');
  const profileForm = document.getElementById('profileForm');

  // Precargar email desde el localStorage (se supone que fue ingresado en el login)
  emailField.value = localStorage.getItem('email') || '';

  // Cargar otros datos si existen
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  document.getElementById('firstName').value = userData.firstName || '';
  document.getElementById('secondName').value = userData.secondName || '';
  document.getElementById('lastName').value = userData.lastName || '';
  document.getElementById('secondLastName').value = userData.secondLastName || '';
  document.getElementById('phone').value = userData.phone || '';

  profileForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validar campos obligatorios
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!firstName || !lastName || !email) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Guardar los datos actualizados en localStorage
    const updatedUserData = {
      firstName,
      secondName: document.getElementById('secondName').value.trim(),
      lastName,
      secondLastName: document.getElementById('secondLastName').value.trim(),
      email,
      phone: document.getElementById('phone').value.trim()
    };

    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    alert('Datos guardados exitosamente.');
  });
});
