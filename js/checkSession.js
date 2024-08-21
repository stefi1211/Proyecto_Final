function checkSession() {
    const authenticated = sessionStorage.getItem('authenticated');
    if (authenticated !== 'true') {
        // vuelve al login si el usuario no esta autenticado
        window.location.href = 'login.html';
    }
}

window.onload = checkSession;