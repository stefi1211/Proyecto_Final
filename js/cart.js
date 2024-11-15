document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartMessage = document.getElementById('cart-message');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const placeOrderButton = document.getElementById('place-order');
  const orderFormContainer = document.getElementById('order-form-container');
  const orderForm = document.getElementById('orderForm');
  const shippingTypeSelect = document.getElementById('shipping-type');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryShipping = document.getElementById('summary-shipping');
  const summaryTotal = document.getElementById('summary-total');
  const prevStepLinks = document.querySelectorAll('.prev-step');
  const nextStepLinks = document.querySelectorAll('.next-step');

  // renderizar carrito
  function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartMessage.style.display = 'block';
      subtotalElement.innerText = '$0';
      totalElement.innerText = '$0';
    } else {
      cartMessage.style.display = 'none';
      let total = 0;

      cart.forEach((product) => {
        const { id, name, price, currency, image, quantity } = product;
        const productSubtotal = price * quantity;
        total += productSubtotal;

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
            <button class="btn btn-warning btn-sm mt-2" data-action="remove" data-id="${id}">Eliminar</button>
          </div>`;
        cartItemsContainer.appendChild(productCard);
      });

      subtotalElement.innerText = `$${total}`;
      totalElement.innerText = `$${total}`;
    }
  }

  // manejo de eventos del carrito
  cartItemsContainer.addEventListener('click', function (e) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productId = e.target.getAttribute('data-id');

    if (e.target.dataset.action === 'remove') {
      const updatedCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      renderCartItems();
    } else if (e.target.dataset.action === 'increase') {
      const product = cart.find((item) => item.id === productId);
      if (product) product.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
    } else if (e.target.dataset.action === 'decrease') {
      const product = cart.find((item) => item.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
      }
    }
  });

  // formulario de pedido
  function calculateCosts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const shippingCost = subtotal * parseFloat(shippingTypeSelect.value || 0);
    const total = subtotal + shippingCost;

    summarySubtotal.innerText = `$${subtotal.toFixed(2)}`;
    summaryShipping.innerText = `$${shippingCost.toFixed(2)}`;
    summaryTotal.innerText = `$${total.toFixed(2)}`;
  }

  placeOrderButton.addEventListener('click', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
    } else {
      orderFormContainer.style.display = 'block';
      calculateCosts();
    }
  });

  shippingTypeSelect?.addEventListener('change', calculateCosts);

  // funcionamiento de tabs
  prevStepLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const prevTabId = link.getAttribute('data-prev');
      if (prevTabId) document.querySelector(prevTabId)?.click();
    });
  });

  nextStepLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const nextTabId = link.getAttribute('data-next');
      if (nextTabId) document.querySelector(nextTabId)?.click();
    });
  });
  
    // cambia el color de los campos llenos
    function checkInputFilled(input) {
      if (input.value.trim() !== '') {
          input.classList.add('input-lleno');
      } else {
          input.classList.remove('input-lleno');
      }
  }
  
  const inputs = orderForm.querySelectorAll('input');
  inputs.forEach(input => {
      checkInputFilled(input);
  
      input.addEventListener('input', () => checkInputFilled(input));
  });

  // renderizar
  renderCartItems();
});
