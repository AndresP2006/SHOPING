import { useParams } from "react-router-dom";
import "./Detalles.css";
import { useState, useEffect } from "react";
import { useCart } from "../cartContext/CartContex";
function DetallesProductos() {
  const { id } = useParams();
  const [productos, setProductos] = useState(null);
  const [error, setError] = useState(null);
  const { agregarCarrito } = useCart();

  const handelAgregarCarrito = () => {
    if (productos) {
      agregarCarrito({
        id: productos.id,
        image: productos.image,
        nombre: productos.nombre,
        precio: productos.precio,
        cantidad: 1,
      });
    }
  };

  useEffect(() => {
    const fectProductos = async () => {
      try {
        const response = await fetch("https://api-ten-jet.vercel.app/products");
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del producto");
        }
        const data = await response.json();
        // Buscar el producto por id (asegúrate que el id sea del mismo tipo, string o number)
        const productoEncontrado = data.find(
          (prod) => String(prod.id) === String(id)
        );
        setProductos(productoEncontrado);
      } catch (err) {
        setError(err.message);
      }
    };
    fectProductos();
  }, [id]);

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }
  return (
    <div className="product-detalis">
      {productos ? (
        <>
          <img
            src={productos.image}
            alt={productos.nombre}
            className="imagen-smail"
          />
          <img src={productos.image} alt={productos.nombre} />
          <div className="producto-info">
            <h1>{productos.nombre}</h1>
            <p className="price">{productos.precio}</p>
            <p className="descripcion">{productos.descripcion}</p>
            <div className="size-option">
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>X</button>
            </div>
            <div className="add-to-card" onClick={handelAgregarCarrito}>
              Añadir al carrito
            </div>
          </div>
          <p className="nota">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
            commodi aspernatur! Distinctio consequatur praesentium, delectus
            tempora soluta quasi iure ullam molestias debitis at voluptatum
            eaque, vel illo in deleniti ut!
          </p>
        </>
      ) : (
        <p>Cargando Producto...</p>
      )}
    </div>
  );
}

export default DetallesProductos;
