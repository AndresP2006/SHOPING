import { useCart } from "../cartContext/CartContex";
import "./cart.css";
function Cart() {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();
  const contoEnvio = 10;
  const subTotal = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);
  const total = subTotal + contoEnvio;
  const handelClickCatidad = (productoId) => {
    actualizarCantidad(productoId, 1);
  };
  const handelDisminuirCantidad = (productoId) => {
    const producto = carrito.find((item) => item.id === productoId);
    if (producto.cantidad > 1) {
      actualizarCantidad(productoId, -1);
    }
  };
  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>
      {carrito.length === 0 ? (
        <p>Tu carrito esta vacio</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Accion</p>
          </div>
          <ul className="cart-items">
            {carrito.map((prod) => {
              const totalPrecio = prod.precio * prod.cantidad;
              return (
                <li className="cart-item" key={prod.id}>
                  <div className="product-info">
                    <img
                      src={prod.image}
                      alt={prod.image}
                      className="product-imagen"
                    />
                    <span>{prod.nombre}</span>
                  </div>
                  <p>${prod.precio.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handelDisminuirCantidad(prod.id)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="quantity-input"
                      readOnly
                      value={prod.cantidad}
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handelClickCatidad(prod.id)}
                    >
                      +
                    </button>
                  </div>
                  <p>${totalPrecio.toFixed(2)}</p>
                  <button
                    className="delete-btn"
                    onClick={() => eliminarProducto(prod.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <div className="card-sumary">
        <h2>
          TU <span>CARRITO</span>
        </h2>
        <p>
          Total parcial: <span>${subTotal.toFixed(2)}</span>
        </p>
        <p>
          Tarifa de envio: <span>${contoEnvio.toFixed(2)}</span>
        </p>
        <p className="total">
          total: <span>${total.toFixed(2)}</span>
        </p>
        <button className="checkout-btn">Pasar por la caja</button>
      </div>
    </div>
  );
}

export default Cart;
