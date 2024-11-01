document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartMessage = document.getElementById('cart-message');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');

  function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor

    if (cart.length === 0) {
      cartMessage.style.display = 'block'; // Mostrar mensaje si el carrito está vacío
      subtotalElement.innerText = '$0';
      totalElement.innerText = '$0';
    } else {
      cartMessage.style.display = 'none'; // Ocultar mensaje si hay productos en el carrito
      let total = 0;

      cart.forEach((product) => {
        const { id, name, price, currency, image, quantity } = product;
        const productSubtotal = price * quantity;
        total += productSubtotal;

        // tarjeta del producto
        const productCard = document.createElement('div');
        productCard.classList.add('card', 'mb-3', 'mx-2');
        productCard.style.width = '25rem';
        productCard.innerHTML = `
            <img src="${image}" class="img-fluid pt-2" alt="${name}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Precio: ${currency} ${price}</p>
              <div class="d-flex align-items-center">
                <button class="btn btn-outline-primary btn-sm me-2" data-action="decrease" data-id="${id}">-</button>
                <span class="quantity">${quantity}</span>
                <button class="btn btn-outline-primary btn-sm ms-2" data-action="increase" data-id="${id}">+</button>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <button class="btn btn-warning btn-sm" data-action="remove" data-id="${id}">Eliminar</button>
              </div>
            </div>
          `;
        cartItemsContainer.appendChild(productCard);
      });
      subtotalElement.innerText = `$${total}`;
      totalElement.innerText = `$${total}`;
    }
    updateCartCount();
  }

  cartItemsContainer.addEventListener('click', function (e) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productId = e.target.getAttribute('data-id');

    if (e.target.dataset.action === 'remove') {
      const updatedCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      renderCartItems(); // Volver a renderizar el carrito
    } else if (e.target.dataset.action === 'increase') {
      const product = cart.find((item) => item.id === productId);
      if (product) product.quantity += 1; // Aumentar cantidad
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems(); // Volver a renderizar el carrito
    } else if (e.target.dataset.action === 'decrease') {
      const product = cart.find((item) => item.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1; // Disminuir cantidad
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(); // Volver a renderizar el carrito
      }
    }
    updateCartCount();
  });

  renderCartItems();
});
