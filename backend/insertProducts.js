const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'stefi1211',
  database: 'ecommerce'
});


const directoryPath = path.join(__dirname, 'products');

// insertar productos a la base de datos
const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    const { id, name, description, cost, currency, soldCount, category } = product;
    const query = 'INSERT IGNORE INTO products (id, name, description, cost, currency, soldCount, category) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [id, name, description, cost, currency, soldCount, category], (err, result) => {
      if (err) {
        reject(`Error al insertar producto: ${err}`);
      } else {
        resolve(result);
      }
    });
  });
};

const addProductsFromJSON = async () => {
  try {
    const files = await fs.promises.readdir(directoryPath);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    for (let file of jsonFiles) {
      const filePath = path.join(directoryPath, file);
      const data = await fs.promises.readFile(filePath, 'utf8');
      const product = JSON.parse(data);

     
      const productResult = await insertProduct(product);
      console.log(`Producto insertado: ${product.name}`);
    }
  } catch (err) {
    console.error('Error al procesar los archivos:', err);
  } finally {
    db.end();
  }
};


addProductsFromJSON();
