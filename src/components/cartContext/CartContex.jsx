import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarCarrito = (producto) => {
    setCarrito((carritoAnterior) => {
      const yaExiste = carritoAnterior.findIndex(
        (articulo) => articulo.id === producto.id
      );
      if (yaExiste >= 0) {
        const carritoActualizado = [...carritoAnterior];
        carritoActualizado[yaExiste] = {
          ...carritoActualizado[yaExiste],
          cantidad: carritoActualizado[yaExiste].cantidad + 1,
        };
        return carritoActualizado;
      } else {
        return [...carritoAnterior, { ...producto, cantidad: 1 }];
      }
    });
  };
  const actualizarCantidad = (productoId, catidad) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((producto) =>
        producto.id === productoId
          ? { ...producto, cantidad: producto.cantidad + catidad }
          : producto
      )
    );
  };

  const eliminarProducto = (productoId) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((producto) => producto.id !== productoId)
    );
  };

  return (
    <CartContext.Provider
      value={{ carrito, agregarCarrito, actualizarCantidad, eliminarProducto }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
