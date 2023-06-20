// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch('http://localhost:4000/product');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const agregarProducto = async () => {
    try {
      await fetch('http://localhost:4000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio }),
      });
      obtenerProductos();
      setNombre('');
      setPrecio('');
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await fetch(`http://localhost:4000/product/${id}`, {
        method: 'DELETE',
      });
      obtenerProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const mostrarFormularioActualizar = (producto) => {
    setSelectedProduct(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setShowUpdateForm(true);
  };

  const cancelarModif = () => {
    setSelectedProduct(null)
    setNombre('');
    setPrecio('');
    setShowUpdateForm(false);
  }

  const actualizarProducto = async () => {
    try {
      const response = await fetch(`http://localhost:4000/product/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio }),
      });
  
      if (response.ok) {
        obtenerProductos();
        cancelarModif();
        // setSelectedProduct(null)
        // setNombre('');
        // setPrecio('');
        // setShowUpdateForm(false);
      } else {
        console.error('Error al actualizar el producto');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="input-container">
        {showUpdateForm ? <h2>Modificar Producto</h2> : <h2>Agregar Producto</h2>}
        <input className='input-prod' type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
        <input className='input-prod' type="text" value={precio} onChange={handlePrecioChange} placeholder="Precio" />
        {/* <button className='boton-prod' onClick={agregarProducto}> Agregar </button> */}
        {selectedProduct 
        ?
          <>
          <button className='boton-prod' onClick={actualizarProducto}>Actualizar</button>
          <button className='boton-prod' onClick={cancelarModif}> Cancelar </button>
          </>
        :
          <button className='boton-prod' onClick={agregarProducto}> Agregar </button>
        }
      </div>

      <h2>Listado de Productos</h2>
      <div className="cards-container">
        {productos.map((producto) => (
          <div className="card" key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <div className="button-container">
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              <button onClick={() => mostrarFormularioActualizar(producto)}>Actualizar</button>
            </div>
          </div>
        ))}
      </div>

      {/* {showUpdateForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Actualizar Producto</h2>
            <input type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
            <input type="text" value={precio} onChange={handlePrecioChange} placeholder="Precio" />
            <button onClick={actualizarProducto}>Actualizar</button>
            <button onClick={() => setShowUpdateForm(false)}>Cancelar</button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Productos;
