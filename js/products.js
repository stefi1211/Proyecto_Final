document.addEventListener('DOMContentLoaded', function () {
const categoryId = localStorage.getItem('catID');

    if (!categoryId) {
        console.error('No se ha encontrado un ID de categoría en el almacenamiento local.');
        return;
    }

    // Crear la URL dinámica usando el identificador de categoría
    const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;
    console.log('URL utilizada:, ${url}');  // Verifica la URL

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);  // Verifica los datos recibidos
            const productos = data.products;
            const lista = document.getElementById('productos-lista');

            if (!productos || productos.length === 0) {
                console.warn('No products found.');
                return;
            }

            // Crear una tarjeta por cada producto de la lista y agregarla al HTML
            productos.forEach(producto => {
                const tarjeta = document.createElement('div');
                tarjeta.className = 'col-md-4 mb-4';
                tarjeta.innerHTML = `
<div class="card">
<img src="${producto.image}" class="card-img-top" alt="${producto.name}">
<div class="card-body">
    <p class="card-price">${producto.cost} ${producto.currency}</p>
    <h5 class="card-title">${producto.name}</h5>
    <p class="card-text card-description">${producto.description}</p>
    <p class="card-text card-sold-count">${producto.soldCount} vendidos</p>
</div>
</div>
`;

                lista.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});

