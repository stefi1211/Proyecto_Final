document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    const storedUsuario = localStorage.getItem('usuario');
    const storedContraseña = localStorage.getItem('contraseña');

    if (usuario === storedUsuario && contraseña === storedContraseña) {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('username', usuario);

        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});

