

document.addEventListener('DOMContentLoaded', () => {
  const authenticated = sessionStorage.getItem('authenticated');

  if (authenticated !== 'true') {
      alert('Por favor, inicie sesión para acceder a su perfil.');
      window.location.href = 'login.html';
      return;
  }

  const emailField = document.getElementById('email');
  const profileForm = document.getElementById('profileForm');

  // cargar email en este caso usuario porque no se ingresa con email
  emailField.value = sessionStorage.getItem('username') || '';

  // cargar otros datos
  const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
  document.getElementById('firstName').value = userData.firstName || '';
  document.getElementById('secondName').value = userData.secondName || '';
  document.getElementById('lastName').value = userData.lastName || '';
  document.getElementById('secondLastName').value = userData.secondLastName || '';
  document.getElementById('phone').value = userData.phone || '';

  profileForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // campos obligatorios
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!firstName || !lastName || !email) {
          alert('Por favor complete todos los campos obligatorios.');
          return;
      }

      // guardamos los datos
      const updatedUserData = {
          firstName,
          secondName: document.getElementById('secondName').value.trim(),
          lastName,
          secondLastName: document.getElementById('secondLastName').value.trim(),
          email,
          phone: document.getElementById('phone').value.trim(),
      };

      sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
      alert('Datos guardados exitosamente.');
  });
});
