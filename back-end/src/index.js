import 'dotenv/config.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {
    createConnection,
    createTable
} from './db/dbconnection.js'

import {obtenerProductos, cargarProducto, actualizarProducto, eliminarProducto} from './models/product.model.js'

// const {obtenerProductos} = require('./models/product.model.js');

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// app.use(require('./src/routes/producto.routes').default);

app.get('/product', async (_req, res) => {

    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos de la db' });
    }
})

app.post('/product', async (req, res) => {
    // await createTable()
    const {
        nombre,
        precio
    } = req.body

    try {
        const result = await cargarProducto(nombre, precio);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar un producto de la db' });
    }
})

app.put('/product/:id', async (req, res) => {
    const {
        nombre,
        precio
    } = req.body
    const id = req.params.id;

    try {
        const result = await actualizarProducto(id, nombre, precio);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar un producto de la db' });
    }
})

app.delete('/product/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await eliminarProducto(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar un producto de la db' });
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT||3000}`)
})