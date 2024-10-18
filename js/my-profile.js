document.addEventListener('DOMContentLoaded', () => {
  const authenticated = sessionStorage.getItem('authenticated');

  if (authenticated !== 'true') {
      alert('Por favor, inicie sesión para acceder a su perfil.');
      window.location.href = 'login.html';
      return;
  }

  const emailField = document.getElementById('email');
  const profileForm = document.getElementById('profileForm');
  const imageInput = document.getElementById('imageInput');
  const profileImage = document.getElementById('profileImage');
  const cameraIcon = document.querySelector('.camera-icon');

  // Cargar email en este caso usuario porque no se ingresa con email
  emailField.value = sessionStorage.getItem('username') || '';

  // Cargar otros datos
  const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
  document.getElementById('firstName').value = userData.firstName || '';
  document.getElementById('secondName').value = userData.secondName || '';
  document.getElementById('lastName').value = userData.lastName || '';
  document.getElementById('secondLastName').value = userData.secondLastName || '';
  document.getElementById('phone').value = userData.phone || '';

  // cargar imagen del local
  const profilePic = localStorage.getItem('profilePic');
  if (profilePic) {
      profileImage.src = profilePic;
      profileImage.style.display = 'block'; 
  }

  // carga de imagen
  imageInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              profileImage.src = e.target.result;
              profileImage.style.display = 'block';
              cameraIcon.style.display = 'none'; 
              localStorage.setItem('profilePic', e.target.result); 
          };
          reader.readAsDataURL(file);
      }
  });

  profileForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Campos obligatorios
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!firstName || !lastName || !email) {
          alert('Por favor complete todos los campos obligatorios.');
          return;
      }

      // Guardamos los datos
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
