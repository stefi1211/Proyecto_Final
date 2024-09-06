document.addEventListener('DOMContentLoaded', function () {
  const categoriaID = localStorage.getItem('catID');

  if (!categoriaID) {
    console.error('No hay un ID de categoría en localStorage');
    return;
  }

  //ID de la categoría en la URL
  const url = `https://japceibal.github.io/emercado-api/cats_products/${categoriaID}.json`;
  console.log(`URL utilizada: ${url}`);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      productos = data.products;
      mostrarProductos(productos);
    })
    .catch((error) => {
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
