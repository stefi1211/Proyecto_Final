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
            console.log('Datos del producto recibidos:', data); // Verifica los datos recibidos

            const { name, description, soldCount, images } = data;

            // La primera imagen será la imagen principal
            const mainImage = images[0];
            // Las imágenes relacionadas serán las siguientes imágenes en el array
            const relatedImages = images.slice(1);

            // Establecer la imagen principal
            document.getElementById('mainProductImage').src = mainImage;
            document.getElementById('mainProductImage').alt = name; // Configura el alt
            document.querySelector('.product-name').textContent = name; // Configura el nombre
            document.querySelector('.product-description').textContent = description; // Configura la descripción
            document.getElementById('soldCount').textContent = soldCount; // Configura el número de vendidos

            // Genera el HTML para las imágenes relacionadas en miniatura
            const relatedImagesHtml = relatedImages.map(img => `
                <img src="${img}" class="related-img img-thumbnail" alt="${name}" style="width: 100px; margin-right: 10px; cursor: pointer;">
            `).join('');

            // Añadir las imágenes relacionadas al contenedor
            document.querySelector('.product-related-images').innerHTML = relatedImagesHtml;

            // Añadir funcionalidad para cambiar la imagen principal cuando se haga clic en una imagen relacionada
            document.querySelectorAll('.related-img').forEach(img => {
                img.addEventListener('click', function () {
                    const mainImageElement = document.getElementById('mainProductImage');
                    mainImageElement.src = this.src; // Cambia la imagen principal al hacer clic en una relacionada
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar la información del producto:', error);
        });
});
