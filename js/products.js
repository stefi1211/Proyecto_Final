document.addEventListener('DOMContentLoaded', function () {
    const categoryId = localStorage.getItem('catID');
    if (!categoryId) {
        console.error('No se ha encontrado un ID de categoría en el almacenamiento local.');
        return;
    }
    
    const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`; // Crear la URL dinámica usando el identificador de categoría
    const lista = document.getElementById('productos-lista');
    const searchInput = document.getElementById('search-input');
    let productos = [];
    let catName = '';

   // funcion para crear una tarjeta por cada producto de la lista y agregarla al HTML
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
    <a href="product-info.html" class="btn btn-primary" data-product-id="${producto.id}">Ver Detalles</a>
</div>
</div>
`;
            lista.appendChild(tarjeta);
        });
        setupEventListeners();
    }

    function setupEventListeners() {
        document.querySelectorAll('.card-body a').forEach(link => {
            link.addEventListener('click', function (event) {
                const productId = event.currentTarget.getAttribute('data-product-id');
                if (productId) {
                    localStorage.setItem('productId', productId);
                }
            });
        });
    }

    // funcion para filtrar la busqueda del usuario
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
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue satisfactoria: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data); // Verifica los datos recibidos
            productos = data.products;
            catName = data.catName;
            document.querySelector('.title').textContent = `Listado de ${catName}`; // Cambia el titulo por cada nombre de la categoria en la que se esta
            renderProducts(productos); // Muestra los productos 
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

  
    // Filtrado de precios
    document.getElementById('rangeFilterPrice').addEventListener('click', function () {
        const minPrice = parseFloat(document.getElementById('rangeFilterPriceMin').value) || 0;
        const maxPrice = parseFloat(document.getElementById('rangeFilterPriceMax').value) || Infinity;

        console.log(`Filtrando con precios: Min: ${minPrice}, Max: ${maxPrice}`);

        const productosFiltrados = productos.filter(producto =>
            producto.cost >= minPrice && producto.cost <= maxPrice
        );

        renderProducts(productosFiltrados);
    });

    document.getElementById('clearRangeFilter').addEventListener('click', function () {
        document.getElementById('rangeFilterPriceMin').value = '';
        document.getElementById('rangeFilterPriceMax').value = '';

        renderProducts(productos);
    });

    document.getElementById('sortAsc').addEventListener('click', function () {
        const productosOrdenados = [...productos].sort((a, b) => a.cost - b.cost);
        console.log('Productos ordenados por precio ascendente:', productosOrdenados);
        renderProducts(productosOrdenados);
    });

    document.getElementById('sortDesc').addEventListener('click', function () {
        const productosOrdenados = [...productos].sort((a, b) => b.cost - a.cost);
        console.log('Productos ordenados por precio descendente:', productosOrdenados);
        renderProducts(productosOrdenados);
    });

    document.getElementById('sortByRelevancia').addEventListener('click', function () {
        const productosOrdenados = [...productos].sort((a, b) => b.soldCount - a.soldCount);
        console.log('Productos ordenados por relevancia:', productosOrdenados);
        renderProducts(productosOrdenados);
    });
});
