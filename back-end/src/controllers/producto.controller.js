import {
    createConnection,
    createTable
} from '../db/dbconnection.js';

const ctrProd = {};

ctrProd.getProducts = async (req, res) => {
    await createTable()
    const connDB = createConnection()
    connDB.query('SELECT * FROM productos', (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Error al obtener los productos'
            })
        } else {
            return res.json(result)
        }
    })
}

ctrProd.postProducts = async (req, res) => {
    await createTable()
    const {
        nombre,
        precio
    } = req.body;
    const connDB = createConnection()

    connDB.query('INSERT INTO productos SET ?', {
        nombre,
        precio
    }, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Error al insertar el producto'
            })
        }

        return res.json({
            message: 'Producto insertado correctamente'
        })
    })
}

ctrProd.putProduts = async (req, res) => {
    const {
        nombre,
        precio
    } = req.body

    const id = req.params.id;

    const connDB = createConnection()

    connDB.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Error al modificar el producto'
            })
        }

        return res.json({
            message: 'Producto modificado correctamente'
        })
    })
}

ctrProd.deleteProduts = async (req, res) => {
    const id = req.params.id;

    const connDB = createConnection()

    connDB.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Error al eliminar el producto'
            })
        }

        return res.json({
            message: 'Producto eliminado correctamente'
        })
    })
}

module.exports = ctrProd;