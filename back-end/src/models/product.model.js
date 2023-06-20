import {createConnection, createTable} from '../db/dbconnection.js'

const obtenerProductos = async () => {
    await createTable();
    const sql = 'SELECT * FROM productos'
    const connexion = createConnection();

    try {
        const result = await connexion.promise().query(sql)
        return result[0];
    } catch (error) {
        throw error;
    }
}

const cargarProducto = async (nombre, precio) => {
    await createTable();
    const sql = 'INSERT INTO productos (nombre, precio) VALUES (?, ?)'
    const connexion = createConnection();

    try {
        await connexion.promise().query(sql, [nombre, precio])
        return { mensaje: 'Producto insertado correctamente' };
    } catch (error) {
        throw error;
    }
}

const actualizarProducto = async (id, nombre, precio) => {
    const sql = 'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?'
    const connexion = createConnection();

    try {
        await connexion.promise().query(sql, [nombre, precio, id])
        return { mensaje: 'Producto actualizado correctamente' };
    } catch (error) {
        throw error;
    }
}

const eliminarProducto = async (id) => {
    const sql = 'DELETE FROM productos WHERE id = ?'
    const connexion = createConnection();

    try {
        await connexion.promise().query(sql, [id])
        return { mensaje: 'Producto eliminado correctamente' };
    } catch (error) {
        throw error;
    }
}

export {
    obtenerProductos,
    cargarProducto,
    actualizarProducto,
    eliminarProducto
}