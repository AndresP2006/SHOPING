import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useCart } from "../cartContext/CartContex";
function Navbar() {
  const { carrito } = useCart();

  const totalProductos = carrito.reduce((acc, producto) => {
    return acc + producto.cantidad;
  }, 0);
  return (
    <section className="header">
      <h1 className="logo">
        MERCADOR <span>LIBRE</span>
        <nav className="menu">
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <div className="icons">
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <Link to="/carrito" className="icons-carrito">
            <i className="fas fa-shopping-cart"></i>
            <span className="counter" style={{ color: "black" }}>
              {totalProductos}
            </span>
          </Link>
        </div>
      </h1>
    </section>
  );
}

export default Navbar;
