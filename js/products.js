document.addEventListener('DOMContentLoaded', function () {
    // enlace a json con productos
    const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productos = data.products;
            const lista = document.getElementById('productos-lista');

            // cra una tarjeta por cada producto de la lista y la agrega al html
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