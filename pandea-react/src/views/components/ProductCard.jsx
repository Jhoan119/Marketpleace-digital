export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="pro">
      <img src={product.img} alt={product.name} loading="lazy" />
      <div className="des">
        <span>{product.brand}</span>
        <h5>{product.name}</h5>
        <div className="star">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star-half-alt" />
        </div>
        <h4>{product.getFormattedPrice()}</h4>
      </div>
      <button
        className="add-to-cart"
        onClick={() => onAddToCart(product)}
        aria-label="Agregar al carrito"
      >
        <i className="bi bi-cart3" />
      </button>
    </div>
  );
}
