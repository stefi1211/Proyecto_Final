
document.addEventListener('DOMContentLoaded', function () {
    const catID = localStorage.getItem('catID');
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;  // enlace a json con productos
    const lista = document.getElementById('productos-lista');
    const searchInput = document.getElementById('search-input');
    let productos = []
    let catName = '';

    function renderProducts(filteredProducts) {
        lista.innerHTML = '';
        filteredProducts.forEach(producto => {
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
    }

    function filterProducts(query) {
        const lowerCaseQuery = query.toLowerCase();
        const filteredProducts = productos.filter(producto => 
            producto.name.toLowerCase().includes(lowerCaseQuery) || 
            producto.description.toLowerCase().includes(lowerCaseQuery)
        );
        renderProducts(filteredProducts);
    }

    searchInput.addEventListener('input', function () {
        filterProducts(searchInput.value);
    });

    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data.products;
            catName = data.catName;
            document.querySelector('h1.title').textContent = `Listado de ${catName}`;
            renderProducts(productos);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});