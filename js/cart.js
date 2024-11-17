document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartMessage = document.getElementById('cart-message');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const placeOrderButton = document.getElementById('place-order');
  const orderFormContainer = document.getElementById('order-form-container');
  const formContainer = document.getElementById('orderForm');
  const shippingTypeSelect = document.getElementById('shipping-type');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryShipping = document.getElementById('summary-shipping');
  const summaryTotal = document.getElementById('summary-total');
  const prevStepLinks = document.querySelectorAll('.prev-step');
  const nextStepLinks = document.querySelectorAll('.next-step');

  // productos del carrito
  function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
      cartMessage.style.display = 'block'; 
      subtotalElement.innerText = '$0';
      totalElement.innerText = '$0';
      return;
    } else {
      cartMessage.style.display = 'none'; 
    }

    let subtotal = 0;

    cart.forEach((product) => {
      const { id, name, price, currency, image, quantity } = product;
      const productSubtotal = price * quantity;
      subtotal += productSubtotal;

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

    subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
    totalElement.innerText = `$${subtotal.toFixed(2)}`;
    updateCartCount();
  }

  // formulario del pedido
  placeOrderButton.addEventListener('click', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    orderFormContainer.style.display = 'block';
    const subtotal = parseFloat(subtotalElement.innerText.slice(1)) || 0;
    calculateOrderCosts(subtotal);
  });

  // calcular total
  function calculateOrderCosts(subtotal) {
    const shippingRate = parseFloat(shippingTypeSelect.value);
    const shippingCost = subtotal * shippingRate;
    const total = subtotal + shippingCost;

    summarySubtotal.innerText = `$${subtotal.toFixed(2)}`;
    summaryShipping.innerText = `$${shippingCost.toFixed(2)}`;
    summaryTotal.innerText = `$${total.toFixed(2)}`;
  }

  shippingTypeSelect.addEventListener('change', function () {
    const subtotal = parseFloat(subtotalElement.innerText.slice(1)) || 0;
    calculateOrderCosts(subtotal);
  });

  // actualizar cantidades y eliminar productos
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
    updateCartCount();
  });

  renderCartItems();

  // estilo de los input
  function checkInputFilled(input) {
    if (input.value.trim() !== '') {
        input.classList.add('input-lleno');
    } else {
        input.classList.remove('input-lleno');
    }
}

const inputs = formContainer.querySelectorAll('input');
inputs.forEach(input => {
    checkInputFilled(input);

    input.addEventListener('input', () => checkInputFilled(input));
});

// comportamiento de volver y siguiente
prevStepLinks.forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const prevTabId = link.getAttribute('data-prev');
    if (prevTabId) document.querySelector(prevTabId).click();
  });
});

nextStepLinks.forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const nextTabId = link.getAttribute('data-next');
    if (nextTabId) document.querySelector(nextTabId).click();
  });
});

});

document.addEventListener('DOMContentLoaded', () => {
  const finalizepurchaseButton = document.getElementById('finalize-purchase');

  // Función para obtener los productos del carrito del localStorage
  function getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Función de validación de formulario
  function validateForm() {
    // Validación de dirección
    const department = document.getElementById('department').value;
    const locality = document.getElementById('locality').value;
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const corner = document.getElementById('corner').value;

    if (!department || !locality || !street || !number || !corner) {
      alert('Por favor completa todos los campos de la dirección.');
      return false;
    }

    // Validación de tipo de envío
    const shippingType = document.getElementById('shipping-type');
    if (!shippingType || !shippingType.value) {
      alert('Por favor selecciona un tipo de envío.');
      return false;
    }

    // Validación de forma de pago
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
      alert('Por favor selecciona una forma de pago.');
      return false;
    }

    if (paymentMethod.value === 'creditCard') {
      const creditCardNumber = document.getElementById('credit-card-number').value;
      if (!creditCardNumber) {
        alert('Por favor ingresa el número de tarjeta de crédito.');
        return false;
      }
    } else if (paymentMethod.value === 'bankTransfer') {
      const bankAccount = document.getElementById('bank-account').value;
      if (!bankAccount) {
        alert('Por favor ingresa el número de cuenta bancaria.');
        return false;
      }
    }

    return true;
  }

  // Verificar si el carrito está vacío y si los productos tienen cantidad mayor a 0
  finalizepurchaseButton.addEventListener('click', (event) => {
    const cartItems = getCartItems();
    
    // Verificar si el carrito está vacío
    if (cartItems.length === 0) {
      event.preventDefault();
      alert('Tu carrito está vacío. ¡Añade productos antes de finalizar la compra!');
      return; // Detener el flujo si el carrito está vacío
    }

    // Verificar que los productos tienen cantidad mayor a 0
    for (const item of cartItems) {
      if (item.quantity <= 0) {
        event.preventDefault();
        alert('Asegúrate de que todos los productos tienen una cantidad mayor a 0.');
        return;
      }
    }

    function clearCart() {
      // Vaciar el carrito en localStorage
      localStorage.removeItem('cart');
      // Llamar a la función que renderiza los productos del carrito
      renderCartItems();
    }
      
      // Mostrar mensaje de compra exitosa
      alert('¡Compra exitosa! Gracias por tu compra.');
      
      // Redirigir o hacer algo más si es necesario
      // window.location.href = 'thank-you.html'; // O redirigir a una página de agradecim    }
  });
});

    
