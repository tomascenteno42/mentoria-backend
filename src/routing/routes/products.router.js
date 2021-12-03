const { Router } = require('express');
const { db } = require('../../database/db');

const productsRouter = Router();

let currentId = 1;

// http://localhost:8080/api/v1/products/
productsRouter.get('/', (req, res) => {
    if (db.products.length === 0) {
        return res
            .status(404)
            .json({ error: 'There are no products in the db!' });
    }

    return res.json(db.products);
});

// http://localhost:8080/api/v1/products/create
productsRouter.post('/create', (req, res) => {
    const { body } = req;

    const product = {
        ...body,
        id: currentId,
    };

    db.products.push(product);

    currentId++;

    return res.json(product);
});

// http://localhost:8080/api/v1/products/1
productsRouter.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = db.products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found!' });
    }

    return res.json(product);
});

productsRouter.patch('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const toUpdate = req.body;

    let updatedProduct = {};

    for (let i = 0; i < db.products.length; i++) {
        if (db.products[i].id === productId) {
            db.products[i] = {
                ...db.products[i],
                ...toUpdate,
            };

            updatedProduct = db.products[i];
        }
    }

    if (Object.keys(updatedProduct).length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.json(updatedProduct);
});

/*
    endpoint = http://localhost:8080/api/v1/products/:id
    http method = DELETE
*/
productsRouter.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    db.products = db.products.filter((product) => product.id !== productId);

    console.log(db);

    return res.status(200).json();
});

exports.productsRouter = productsRouter;
