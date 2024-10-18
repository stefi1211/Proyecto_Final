document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('nuevo-usuario').value.trim();
    const contraseña = document.getElementById('nueva-contraseña').value.trim();

    if (usuario !== '' && contraseña !== '') {
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('contraseña', contraseña);

        window.location.href = 'login.html';
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

