document.addEventListener('DOMContentLoaded', () => {
  // Función para actualizar el nombre de usuario y el enlace
  const userName = sessionStorage.getItem('username') || localStorage.getItem('username') || null;
  const userLink = document.getElementById('user-link');

  if (userLink) { 
    if (userName) {
      userLink.innerHTML = `<strong>Hola!</strong> ${userName}`;
      userLink.href = 'my-profile.html'; 
    } else {
      userLink.textContent = 'Login';
      userLink.href = 'login.html';
    }
  }

  // badge del carrito

  window.updateCartCount = function() {  // Definir la función en el ámbito global
    const cartCountBadge = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartCountBadge.textContent = totalItems;
  }

  updateCartCount(); 
});

