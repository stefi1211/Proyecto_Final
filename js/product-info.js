document.addEventListener('DOMContentLoaded', function () {
  const productId = localStorage.getItem('productId');
  if (!productId) {
    console.error(
      'No se ha encontrado un ID de producto en el almacenamiento local.'
    );
    return;
  }

  const productUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
  const productInfo = document.getElementById('product-info');
  const ratingsList = document.getElementById('ratings-list');
  const relatedProductsDiv = document.getElementById('related-products');

  fetch(productUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          'La respuesta de la red no fue satisfactoria: ' + response.statusText
        );
      }
      return response.json();
    })
    .then((data) => {
      const {
        name,
        description,
        soldCount,
        category,
        images,
        cost,
        currency,
        relatedProducts,
      } = data;

      // html detalles
      const mainImage = images[0];
      const thumbnails = images
        .map((img) => `<img src="${img}" class="thumbnail" alt="${name}">`)
        .join('');

      productInfo.innerHTML = `
                <div class="product-images">
                    <img id="mainImage" src="${mainImage}" alt="${name}">
                    <div class="thumbnail-row">${thumbnails}</div>
                </div>
                <div class="product-details">
                    <h2 class="product-title">${name}</h2>
                    <p class="product-category">Categoría: ${category}</p>
                    <p class="product-price">${currency} ${cost}</p>
                    <p>${description}</p>
                    <p class="product-sold-count">Vendidos: ${soldCount}</p>
                    <div class="action-buttons">
        <button class="btn-add-cart">Añadir al carrito</button>
        <button class="btn-cart">Ir al carrito</button>
    </div>
                </div>
            `;

      document
        .querySelector('.btn-cart')
        .addEventListener('click', function () {
          window.location.href = 'cart.html';
        });

      const addToCartButton = document.querySelector('.btn-add-cart');
      addToCartButton.addEventListener('click', function () {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(
          (item) => item.id === productId
        );

        if (existingProductIndex > -1) {
          alert('El producto ya está en el carrito.');
        } else {
          cart.push({
            id: productId,
            name,
            price: cost,
            currency,
            image: mainImage,
            quantity: 1,
          });
          localStorage.setItem('cart', JSON.stringify(cart));
          alert('Producto añadido al carrito.');
        }
        updateCartCount();
      });

      // cambiar img principal
      const thumbnailImages = document.querySelectorAll('.thumbnail');
      thumbnailImages.forEach((thumbnail) => {
        thumbnail.addEventListener('click', function () {
          document.getElementById('mainImage').src = thumbnail.src;

          thumbnailImages.forEach((img) =>
            img.classList.remove('selected-thumbnail')
          );

          thumbnail.classList.add('selected-thumbnail');
        });
      });

      // productos relacionados
      relatedProducts.forEach((product) => {
        relatedProductsDiv.innerHTML += `
                    <div class="card" style="width: 18rem;" data-product-id="${product.id}">
                        <img class="card-img-top" src="${product.image}" alt="${product.name}">
                        <div class="card-body">
                         <h5 class="card-title">${product.name}</h5>
                        </div>
                    </div>
                `;
      });

      relatedProductsDiv.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', function () {
          const productId = card.getAttribute('data-product-id');
          if (productId) {
            localStorage.setItem('productId', productId);
            window.location.href = 'product-info.html';
          }
        });
      });

      // comentarios
      return fetch(commentsUrl);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al cargar comentarios: ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const comments = data;
      comments.forEach((comment) => {
        const { user, description, score, dateTime } = comment;
        const commentHtml = `
                    <div class="border p-2 mb-2">
                        <strong>${user}</strong> - ${new Date(
          dateTime
        ).toLocaleDateString()} 
                        <div>${'★'.repeat(score)}${'☆'.repeat(5 - score)}</div>
                        <p>${description}</p>
                    </div>
                `;
        ratingsList.innerHTML += commentHtml;
      });
    })
    .catch((error) => {
      console.error(
        'Error al cargar la información del producto o comentarios:',
        error
      );
    });

  // calificación por estrellas
  const stars = document.querySelectorAll('.star');
  let selectedRating = 0;

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      selectedRating = star.getAttribute('data-value');
      updateStars(selectedRating);
      document.getElementById('rating').value = selectedRating;
    });
  });

  function updateStars(rating) {
    stars.forEach((star) => {
      star.classList.remove('selected');
      if (star.getAttribute('data-value') <= rating) {
        star.classList.add('selected');
      }
    });
  }

  document
    .getElementById('ratingForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      const comments = document.getElementById('comments').value;
      const selectedRating = document.getElementById('rating').value; //Punto Desafiate: tomar la calificación
      document.getElementById(
        'successMessage'
      ).textContent = `¡Gracias por tu calificación! Comentarios: ${comments}, Calificación: ${selectedRating}`;
      document.getElementById('successMessage').style.display = 'block';
      //Pauta desafiate para agregar la calificación simulada a los comentarios
      const newCommentHtml = `
        <div class="border p-2 mb-2">
            <strong>Usuario Anónimo</strong> - ${new Date().toLocaleDateString()} 
            <div>${'★'.repeat(selectedRating)}${'☆'.repeat(
        5 - selectedRating
      )}</div>
            <p>${comments}</p>
              </div>
              `;
      document.getElementById('ratings-list').innerHTML += newCommentHtml; //con esto se inserta el comentario en la lista

      this.reset();
      updateStars(0); // reinicia las estrellas
      //simulación de envío de calificación
    });
});

// Cambiar tema y almacenar la preferencia. git
document.addEventListener('DOMContentLoaded', () => {
  const themeItems = document.querySelectorAll('.dropdown-item');

  // Función para aplicar el tema
  function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');
    if (theme === 'light') {
      document.body.classList.add('light');
    } else if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }

  // Cargar tema desde local storage
  const savedTheme = localStorage.getItem('theme') || 'auto';
  if (savedTheme === 'auto') {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(isDarkMode ? 'dark' : 'light');
  } else {
    applyTheme(savedTheme);
  }

  // Cambiar tema y guardar en local storage al hacer click
  themeItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      const selectedTheme = event.target.getAttribute('data-theme');
      localStorage.setItem('theme', selectedTheme);
      applyTheme(selectedTheme);
    });
  });
});
