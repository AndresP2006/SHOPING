import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import Navbar from "./components/navbar/navbar";
import DetallesProductos from "./components/datalles/DestallesProductos";
import { CartProvider } from "./components/cartContext/CartContex";
import Cart from "./components/Cart/Cart";
function App() {
  return (
    <div>
      <CartProvider>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Detalles/:id" element={<DetallesProductos />}></Route>
            <Route path="/carrito" element={<Cart />}></Route>
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
