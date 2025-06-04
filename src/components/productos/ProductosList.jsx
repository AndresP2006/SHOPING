import { useState, useEffect } from "react";
import "./productosList.css";
import { useNavigate } from "react-router-dom";

function ProductosList({ buscarTermino }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState("Relevante");
  const [filtros, setFiltros] = useState({ categoria: [], tipo: [] });
  const Navigate = useNavigate();

  useEffect(() => {
    const fectProductos = async () => {
      try {
        const response = await fetch("https://api-ten-jet.vercel.app/products");
        if (!response.ok) {
          throw new Error("Error al cargar Productos");
        }
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fectProductos();
  }, []);

  const normalizarTexto = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const ProductosFiltrados = productos.filter((prod) => {
    const macthCategoria =
      filtros.categoria.length === 0 ||
      filtros.categoria.includes(prod.categoria);
    const macthTipo =
      filtros.tipo.length === 0 || filtros.tipo.includes(prod.tipo);

    const macthBuscar =
      !buscarTermino ||
      normalizarTexto(prod.nombre).includes(normalizarTexto(buscarTermino)) ||
      normalizarTexto(prod.descripcion).includes(
        normalizarTexto(buscarTermino)
      );

    return macthCategoria && macthTipo && macthBuscar;
  });
  function hadleOrdenEvent(e) {
    setOrden(e.target.value);
  }

  const ProductosOrdenados = [...ProductosFiltrados].sort((a, b) => {
    if (orden === "Menor a Mayor") {
      return a.precio - b.precio;
    }
    if (orden === "Mayor a Menor") {
      return b.precio - a.precio;
    }
    return 0;
  });

  const FiltraTodos = (tipoFiltro, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [tipoFiltro]: prev[tipoFiltro].includes(valor)
        ? prev[tipoFiltro].filter((items) => items !== valor)
        : [...prev[tipoFiltro], valor],
    }));
  };

  const handleImgClick = (id) => {
    Navigate(`/Detalles/${id}`);
  };
  return (
    <section className="main-contein">
      <aside className="filter">
        <h2>filtros</h2>
        <div className="filters-categori">
          <div className="filter-categori">
            <h3>Categoria</h3>
            <label htmlFor="">
              <input
                type="checkbox"
                onChange={() => FiltraTodos("categoria", "Hombres")}
              />

              <span>Hombre</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                onChange={() => FiltraTodos("categoria", "Mujeres")}
              />
              <span>Mujeres</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                onChange={() => FiltraTodos("categoria", "Niños")}
              />
              <span>Niños</span>
            </label>
          </div>
          <div className="filter-categori">
            <h3>Tipos de Ropa</h3>
            <label htmlFor="">
              <input
                type="checkbox"
                onChange={() => FiltraTodos("tipo", "Ropa interior")}
              />
              <span>Ropa interior</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                onChange={() => FiltraTodos("tipo", "Prendas de abrigo")}
              />
              <span>Prendas de abrigo</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                onChange={() => FiltraTodos("tipo", "Calzado")}
              />
              <span>Calzado</span>
            </label>
          </div>
        </div>
      </aside>
      <div className="collection">
        <div className="options">
          <h2>TODAS LAS COLECCIONES</h2>
          <div className="sort-option">
            <label htmlFor="">
              Ordenar por:
              <select name="" id="" onChange={hadleOrdenEvent} value={orden}>
                <option>Relevante</option>
                <option>Mayor a Menor</option>
                <option>Menor a Mayor</option>
              </select>
            </label>
          </div>
        </div>
        <div className="products">
          {error ? (
            <p className="error-message">{error}</p>
          ) : ProductosFiltrados.length > 0 ? (
            ProductosOrdenados.map((e) => (
              <div className="product-card" key={e.id}>
                <img
                  src={e.image}
                  alt={e.nombre}
                  className="product-image"
                  onClick={() => handleImgClick(e.id)}
                  style={{ cursor: "pointer" }}
                />
                <h3>{e.nombre}</h3>
                <p>{e.precio}</p>
              </div>
            ))
          ) : (
            <p className="no-result">
              No hay Productos que Coincidan con los tipos selecionados
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductosList;
