document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    // agarra los datos del local storage y los guarda  
    const storedUsuario = localStorage.getItem('usuario');
    const storedContraseña = localStorage.getItem('contraseña');

    if (usuario === storedUsuario && contraseña === storedContraseña) {
        // se almacena la sesion en local storage y lleva al index
        sessionStorage.setItem('authenticated', 'true');

        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});