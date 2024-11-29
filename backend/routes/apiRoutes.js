const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs'); // manejo de las comtraseñas
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();
const { authorize } = require('./middlewares/authorize'); 

const router = express.Router();

// coneccion a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,  
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME  
});

const SECRET_KEY = process.env.SECRET_KEY;

// registrar usuario
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor ingresa un nombre de usuario y una contraseña.' });
  }

  // verificar usuario existente
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hubo un problema al verificar el usuario.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
    }

    
    const hashedPassword = bcrypt.hashSync(password, 10); 

    // guardar usuario
    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(insertQuery, [username, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Hubo un error al guardar el usuario.' });
      }

      // generar tokrn
      const token = jwt.sign({ id: result.insertId, username }, SECRET_KEY, { expiresIn: '1h' });

      res.json({ token });
    });
  });
});

// endpoint login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Hubo un problema al verificar las credenciales.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // generar token nuevamente
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      message: 'Login exitoso',
      token
    });
  });
});

// agregar productos al carrito
router.post('/cart', authorize, (req, res) => {
  const { products } = req.body;  

  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'El carrito no puede estar vacío' });
  }

  const userId = req.user.id;

  const queries = products.map(product => {
    return new Promise((resolve, reject) => {
      const { product_id, quantity } = product;

      const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
      db.query(query, [userId, product_id, quantity], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });

  Promise.all(queries)
    .then(() => {
      res.json({ message: 'Productos agregados al carrito correctamente' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Hubo un error al agregar los productos al carrito' });
    });
});

router.get('/:filename', authorize, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../data', filename, `${filename}.json`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
