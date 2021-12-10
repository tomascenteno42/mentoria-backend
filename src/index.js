require('dotenv').config();

// LIBRERIAS EXTERNAS
const express = require('express');
const bodyParser = require('body-parser');

// CODIGO PROPIO
const { db } = require('./database/db');
const { productsRouter } = require('./routing/routes/products.router');

const PORT = process.env.API_PORT || 8080;

const app = express();
const apiRouter = express.Router();

// CONFIGURACION DEL SERVER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTER PRINCIPAL
app.use('/api/v1', apiRouter);

// api/v1/products
apiRouter.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
