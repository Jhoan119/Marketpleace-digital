import { useProductController } from "../../controllers/useProductController";
import { useCartController } from "../../controllers/useCartController";
import ProductCard from "../components/ProductCard";

const FILTERS = [
  { label: "Todos",      value: "all" },
  { label: "Camisas",    value: "camisa" },
  { label: "Suéteres",   value: "sueter" },
  { label: "Pantalones", value: "pantalon" },
  { label: "Blusas",     value: "blusa" },
];

export default function Shop() {
  const { products, category, setCategory, query, setQuery } = useProductController();
  const { handleAddToCart } = useCartController();

  return (
    <section id="shop-page" className="section-p1">
      <div className="shop-header">
        <h2>Todos los Productos</h2>

        {/* Búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            id="search-input"
            placeholder="Buscar productos..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button><i className="fas fa-search" /></button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn ${category === f.value ? "active" : ""}`}
            onClick={() => { setCategory(f.value); setQuery(""); }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="pro-container" id="shop-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "40px", width: "100%" }}>
            <i className="fas fa-search" style={{ fontSize: 48, color: "#ccc", marginBottom: 16 }} />
            <p>No se encontraron productos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
