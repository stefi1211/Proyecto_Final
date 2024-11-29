document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('nuevo-usuario').value.trim();
    const contraseña = document.getElementById('nueva-contraseña').value.trim();

    if (usuario !== '' && contraseña !== '') {
        const registroData = {
            username: usuario,
            password: contraseña
        };

        // solicitud al backend para registrar al usuario
        fetch('http://localhost:3000/api/register', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registroData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                window.location.href = 'login.html'; 
            } else {
                alert('Error en el registro: ' + (data.message || 'Inténtalo nuevamente.'));
            }
        })
        .catch(error => {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema con el registro. Por favor, intenta nuevamente.');
        });
    } else {
        alert('Por favor, complete todos los campos.');
    }
});
