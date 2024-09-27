document.addEventListener('DOMContentLoaded', function () {
    const productId = localStorage.getItem('productId');
    if (!productId) {
        console.error('No se ha encontrado un ID de producto en el almacenamiento local.');
        return;
    }

    const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    const productInfo = document.getElementById('product-info');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue satisfactoria: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos del producto recibidos:', data);

            const { name, description, soldCount, images, category, cost } = data;  // Incluimos la categoría

            // Establecer la imagen principal
            document.getElementById('mainProductImage').src = images[0];
            document.getElementById('mainProductImage').alt = name;
            document.querySelector('.product-name').textContent = name;
            document.querySelector('.product-description').textContent = description;
            document.getElementById('soldCount').textContent = soldCount;

            // Mostrar la categoría
            document.querySelector('.product-category').textContent = `Categoría: ${category}`; // Muestra la categoría
            document.getElementById('productPrice').textContent = `${cost} USD`;

            // Generar imágenes relacionadas
            const relatedImagesHtml = images.slice(1).map(img => `
                <img src="${img}" class="related-img img-thumbnail" alt="${name}" style="width: 100px; margin-right: 10px; cursor: pointer;">
            `).join('');
            document.querySelector('.product-related-images').innerHTML = relatedImagesHtml;

            // Cambiar la imagen principal al hacer clic en una relacionada
            document.querySelectorAll('.related-img').forEach(img => {
                img.addEventListener('click', function () {
                    document.getElementById('mainProductImage').src = this.src;
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar la información del producto:', error);
        });
});
