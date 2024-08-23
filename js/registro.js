document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('nuevo-usuario').value;('nueva-contraseña').value;
    const contraseña = document.getElementById;

    if (usuario.trim() !== '' && contraseña.trim() !== '') {
        // aca se quechea que los campos de usuario y contraseña no esten vacios y guarda los datos ingresados en local storage
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('contraseña', contraseña);

        window.location.href = 'login.html';
    } else {
        alert('Por favor, complete todos los campos.');
    }
});