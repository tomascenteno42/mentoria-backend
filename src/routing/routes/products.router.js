const { Router } = require('express');
const { query } = require('../../database/db');

const productsRouter = Router();

// http://localhost:8080/api/v1/products/
productsRouter.get('/', async (req, res) => {
    const products = await query(`SELECT * from products;`);
    console.log(products);
    if (products.length === 0) {
        return res
            .status(404)
            .json({ error: 'There are no products in the db!' });
    }

    return res.json(products);
});

// http://localhost:8080/api/v1/products/create
productsRouter.post('/create', async (req, res) => {
    const { body } = req;

    const product = body;

    if (!('name' in product) || !('description' in product)) {
        return res.status(400).json({ error: 'Please check your input!' });
    }

    const response = await query(`
        INSERT INTO products (name, description)
        VALUES ('${product.name}', '${product.description}');
    `);

    const [newProduct] = await query(
        `select * from products where id=${response.insertId};`
    );

    return res.json(newProduct);
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
