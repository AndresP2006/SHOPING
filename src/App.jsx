import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import Navbar from "./components/navbar/navbar";
import DetallesProductos from "./components/datalles/DestallesProductos";
import { CartProvider } from "./components/cartContext/CartContex";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import Search from "./components/search/Search";
function App() {
  const [buscarTermino, setBuscarTermino] = useState("");
  const handelBuscar = (termino) => {
    setBuscarTermino(termino.toLowerCase());
  };
  return (
    <div>
      <CartProvider>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home buscarTermino={buscarTermino} />} />
            <Route path="/Detalles/:id" element={<DetallesProductos />}></Route>
            <Route path="/carrito" element={<Cart />}></Route>
            <Route
              path="/buscar"
              element={<Search onSearch={handelBuscar} />}
            ></Route>
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
