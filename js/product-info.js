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

            const { name, description, soldCount, images } = data;
            const currency = data.currency; 
            const imagesHtml = images.map(img => `<img src="${img}" alt="${name}">`).join('');
            
            productInfo.innerHTML = `
                <div class="col-md-8">
                    <div class="product-images">
                        ${imagesHtml}
                    </div>
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p><strong>Vendidos:</strong> ${soldCount}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error al cargar la información del producto:', error);
        });
});
