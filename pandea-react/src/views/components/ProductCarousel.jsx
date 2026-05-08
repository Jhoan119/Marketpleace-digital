import { useState, useEffect, useRef } from "react";
import { productService } from "../../services/productService";
import { useCartController } from "../../controllers/useCartController";

export default function ProductCarousel() {
  const products = productService.getAll();
  const { handleAddToCart } = useCartController();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const VISIBLE = 4; // tarjetas visibles a la vez
  const total = products.length;

  const next = () => setCurrent(c => (c + 1) % total);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, [paused, current]);

  // Obtener las 4 tarjetas visibles de forma circular
  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    products[(current + i) % total]
  );

  return (
    <section id="product-carousel">
      <div className="carousel-header">
        <h2>Nuestras Prendas</h2>
        <p>Desliza y descubre toda la colección</p>
      </div>

      <div
        className="carousel-wrapper"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Flecha izquierda */}
        <button className="carousel-arrow left" onClick={() => { prev(); setPaused(true); }}>
          <i className="fas fa-chevron-left" />
        </button>

        {/* Tarjetas */}
        <div className="carousel-track">
          {visible.map((product, i) => (
            <div className="carousel-card" key={`${product.id}-${i}`}>
              <div className="carousel-img-wrap">
                <img src={product.img} alt={product.name} loading="lazy" />
                <button
                  className="carousel-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="bi bi-cart3" /> Agregar
                </button>
              </div>
              <div className="carousel-info">
                <span>{product.brand}</span>
                <h5>{product.name}</h5>
                <h4>{product.getFormattedPrice()}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button className="carousel-arrow right" onClick={() => { next(); setPaused(true); }}>
          <i className="fas fa-chevron-right" />
        </button>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {products.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => { setCurrent(i); setPaused(true); }}
          />
        ))}
      </div>
    </section>
  );
}
