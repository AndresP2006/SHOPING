import { useState } from "react";
import ProdcutosList from "../components/productos/ProductosList";
import Search from "../components/search/Search";
import "../styles/index.css";
import React from "react";
function Home({ buscarTermino }) {
  const [buscarTerminoLocal, setBuscarTerminoLocal] = useState("");
  const handleBuscar = (termino) => {
    setBuscarTerminoLocal(termino);
  };
  return (
    <div>
      <Search onSearch={handleBuscar}></Search>
      <ProdcutosList buscarTermino={buscarTermino || buscarTerminoLocal} />
    </div>
  );
}

export default Home;
