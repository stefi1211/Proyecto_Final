/*
  document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartMessage = document.getElementById('cart-message');
  
    // Obtener productos del carrito en localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Si el carrito está vacío, muestra el mensaje y oculta el contenedor de productos
    if (cart.length === 0) {
      cartMessage.style.display = 'block';
    } else {
      cartMessage.style.display = 'none';
      
      // Generar el HTML para cada producto en el carrito
      cart.forEach((product, index) => {
        const productHTML = `
          <div class="col-12 mb-3">
            <div class="card">
              <div class="row g-0">
                <div class="col-md-3">
                  <img src="${product.image}" class="img-fluid" alt="${product.name}">
                </div>
                <div class="col-md-9">
                  <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: ${product.currency} ${product.price}</p>
                    <p class="card-text">Subtotal: <span class="subtotal">${product.currency} ${product.price * product.quantity}</span></p>
                    <label for="quantity-${index}">Cantidad:</label>
                    <input type="number" id="quantity-${index}" class="form-control quantity-input" value="${product.quantity}" min="1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        cartItemsContainer.innerHTML += productHTML;
      });
  
      // Escuchar los cambios de cantidad y actualizar el subtotal
      const quantityInputs = document.querySelectorAll('.quantity-input');
      quantityInputs.forEach((input, index) => {
        input.addEventListener('input', function () {
          const newQuantity = parseInt(input.value);
          if (newQuantity >= 1) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
  
            // Actualizar subtotal
            const subtotalElement = input.closest('.card-body').querySelector('.subtotal');
            subtotalElement.textContent = `${cart[index].currency} ${cart[index].price * newQuantity}`;
          }
        });
      });
    }
  });
  */
  document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartMessage = document.getElementById("cart-message");
  
    function renderCartItems() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
  
      if (cart.length === 0) {
        cartMessage.style.display = "block"; // Mostrar mensaje si el carrito está vacío
      } else {
        cartMessage.style.display = "none"; // Ocultar mensaje si hay productos en el carrito
  
        // Generar el HTML para cada producto en el carrito
        cart.forEach((product) => {
          const { id, name, price, currency, image, quantity } = product;
  
          // Crear la tarjeta de producto
          const productCard = document.createElement("div");
          productCard.classList.add("card", "mb-3", "mx-2");
          productCard.style.width = "18rem"; // Ancho de la tarjeta
          productCard.innerHTML = `
            <img src="${image}" class="img-fluid" alt="${name}" style="height: 150px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Precio: ${currency} ${price}</p>
              <div class="d-flex align-items-center">
                <button class="btn btn-outline-primary btn-sm me-2" data-action="decrease" data-id="${id}">-</button>
                <span class="quantity">${quantity}</span>
                <button class="btn btn-outline-primary btn-sm ms-2" data-action="increase" data-id="${id}">+</button>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <button class="btn btn-danger btn-sm" data-action="remove" data-id="${id}">Eliminar</button>
                <button class="btn btn-success btn-sm">Comprar ahora</button>
              </div>
            </div>
          `;
          cartItemsContainer.appendChild(productCard);
        });
      }
    }
  
    cartItemsContainer.addEventListener("click", function (e) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productId = e.target.getAttribute("data-id");
  
      if (e.target.dataset.action === "remove") {
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        renderCartItems(); // Volver a renderizar el carrito
      } else if (e.target.dataset.action === "increase") {
        const product = cart.find(item => item.id === productId);
        if (product) product.quantity += 1; // Aumentar cantidad
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems(); // Volver a renderizar el carrito
      } else if (e.target.dataset.action === "decrease") {
        const product = cart.find(item => item.id === productId);
        if (product && product.quantity > 1) {
          product.quantity -= 1; // Disminuir cantidad
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCartItems(); // Volver a renderizar el carrito
        }
      }
    });
  
    renderCartItems(); // Renderizar los productos al cargar la página
  });
  