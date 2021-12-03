require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./database/db');
const { productsRouter } = require('./routing/routes/products.router');

const PORT = process.env.API_PORT;

const app = express();
const apiRouter = express.Router();

// CONFIGURACION DEL SERVER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', apiRouter);

// api/v1/products
apiRouter.use('/products', productsRouter);

// ENDPOINTs
apiRouter.get('/hola', (req, res) => {
    return res.json({ salute: 'HOLA' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
