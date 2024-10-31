/* 
document.addEventListener('DOMContentLoaded', function () {
    async function loadCart() {
      const cartItemsContainer = document.getElementById('cart-items');
      const cartMessage = document.getElementById('cart-message');
      const relatedProductsDiv = document.getElementById('related-products');
  
      const categories = ['101', '102', '103', '104']; // Añade más categorías según sea necesario.
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      if (cartItems.length === 0) {
        // Mostrar mensaje de carrito vacío.
        cartMessage.style.display = 'block';
  
        try {
          // Cargar productos relacionados aleatorios.
          const products = await Promise.all(
            categories.map(async (category) => {
              const response = await fetch(
                `https://japceibal.github.io/emercado-api/cats_products/${category}.json`
              );
              const data = await response.json();
              const randomProduct =
                data.products[Math.floor(Math.random() * data.products.length)];
              return randomProduct;
            })
          );
  
          // Renderizar productos relacionados.
          products.forEach((product) => {
            const productCard = `
              <div class="col-md-4 mb-3">
                <div class="card" style="width: 18rem;" data-product-id="${product.id}">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                  </div>
                </div>
              </div>`;
            relatedProductsDiv.innerHTML += productCard;
          });
  
          // Agregar eventos a los productos relacionados.
          relatedProductsDiv.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('click', function () {
              const productId = card.getAttribute('data-product-id');
              if (productId) {
                localStorage.setItem('productId', productId);
                window.location.href = 'product-info.html';
              }
            });
          });
        } catch (error) {
          console.error('Error al cargar productos relacionados:', error);
        }
      } else {
        cartMessage.style.display = 'none'; // Ocultar mensaje si hay productos.
  
        cartItems.forEach((item) => {
          const subtotal = item.price * item.quantity;
  
          const itemCard = `
            <div class="col-md-4 mb-3">
              <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">Precio: ${item.currency} ${item.price.toFixed(2)}</p>
                  <div class="mb-2">
                    <label>Cantidad:</label>
                    <input type="number" class="form-control quantity-input" 
                           value="${item.quantity}" min="1" data-id="${item.id}">
                  </div>
                  <p class="card-text subtotal-text">
                    Subtotal: ${item.currency} ${subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>`;
          cartItemsContainer.innerHTML += itemCard;
        });
  
        // Agregar eventos para recalcular el subtotal al cambiar la cantidad.
        cartItemsContainer.querySelectorAll('.quantity-input').forEach((input) => {
          input.addEventListener('input', function () {
            const newQuantity = parseInt(this.value);
            const productId = this.getAttribute('data-id');
            const product = cartItems.find((item) => item.id === productId);
  
            if (product) {
              product.quantity = newQuantity;
              const newSubtotal = product.price * newQuantity;
  
              // Actualizar el subtotal en la interfaz.
              this.closest('.card-body')
                .querySelector('.subtotal-text')
                .textContent = `Subtotal: ${product.currency} ${newSubtotal.toFixed(2)}`;
  
              // Actualizar el carrito en localStorage.
              localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
          });
        });
      }
    }
  
    loadCart();
  });  */
  
  document.addEventListener('DOMContentLoaded', function () {
    function loadCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartMessage = document.getElementById('cart-message');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            cartMessage.style.display = 'block'; // Muestra el mensaje de carrito vacío
        } else {
            cartMessage.style.display = 'none'; // Oculta el mensaje
            cartItems.forEach(item => {
                // Estructura de la tarjeta basada en el prototipo
                const itemCard = `
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">Precio: ${item.currency} ${item.price.toFixed(2)}</p>
                                <p class="card-text">Cantidad: ${item.quantity}</p>
                                <p class="card-text">Subtotal: ${item.currency} ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.innerHTML += itemCard;
            });
        }
    }

    loadCart();
});
