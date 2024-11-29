const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes'); 
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});