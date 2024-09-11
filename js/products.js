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

// Filtrado de precios
document
  .getElementById('rangeFilterPrice')
  .addEventListener('click', function () {
    const minPrice =
      parseFloat(document.getElementById('rangeFilterPriceMin').value) || 0;
    const maxPrice =
      parseFloat(document.getElementById('rangeFilterPriceMax').value) ||
      Infinity;

    console.log(`Filtrando con precios: Min: ${minPrice}, Max: ${maxPrice}`);

    const productosFiltrados = productos.filter(
      (producto) => producto.cost >= minPrice && producto.cost <= maxPrice
    );

    console.log('Productos filtrados:', productosFiltrados);
    mostrarProductos(productosFiltrados);
  });

document
  .getElementById('clearRangeFilter')
  .addEventListener('click', function () {
    document.getElementById('rangeFilterPriceMin').value = '';
    document.getElementById('rangeFilterPriceMax').value = '';

    mostrarProductos(productos);
  });

document.getElementById('sortAsc').addEventListener('click', function () {
  const productosOrdenados = productos.sort((a, b) => a.cost - b.cost);
  console.log('Productos ordenados por precio ascendente:', productosOrdenados);
  mostrarProductos(productosOrdenados);
});

document.getElementById('sortDesc').addEventListener('click', function () {
  const productosOrdenados = productos.sort((a, b) => b.cost - a.cost);
  console.log(
    'Productos ordenados por precio descendente:',
    productosOrdenados
  );
  mostrarProductos(productosOrdenados);
});

document
  .getElementById('sortByRelevancia')
  .addEventListener('click', function () {
    const productosOrdenados = productos.sort(
      (a, b) => b.soldCount - a.soldCount
    );
    console.log('Productos ordenados por relevancia:', productosOrdenados);
    mostrarProductos(productosOrdenados);
  });

function mostrarProductos(productos) {
  const lista = document.getElementById('productos-lista');
  lista.innerHTML = '';

  productos.forEach((producto) => {
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

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const productos = data.products; // Asignamos los productos obtenidos

    // Cambiar el título de la página con el nombre de la categoría
    const nombreCategoria = data.catName; // Obtenemos el nombre de la categoría desde el JSON
    document.querySelector(
      '.title'
    ).textContent = `Listado de ${nombreCategoria}`;

    mostrarProductos(productos); // Mostramos los productos inicialmente
  })
  .catch((error) => {
    console.error('Error al cargar los productos:', error);
  });