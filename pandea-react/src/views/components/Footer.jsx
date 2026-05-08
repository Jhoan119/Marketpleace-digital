import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content section-p1">
        <div className="footer-col">
          <h2 className="logo-text">PANDEA</h2>
          <p>Tu tienda de moda favorita. Calidad y estilo en cada prenda.</p>
        </div>
        <div className="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/shop">Productos</Link></li>
            <li><Link to="/about">Acerca De</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram" /></a>
            <a href="#"><i className="fab fa-facebook" /></a>
            <a href="#"><i className="fab fa-tiktok" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Pandea. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
