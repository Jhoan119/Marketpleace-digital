import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAuthController } from "../../controllers/useAuthController";
import { useCartController } from "../../controllers/useCartController";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import ForgotModal from "./modals/ForgotModal";

export default function Navbar() {
  const { user } = useAuth();
  const { logout } = useAuthController();
  const { count, openCart } = useCartController();
  const location = useLocation();

  const [modal, setModal] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header id="header">
        {/* Logo */}
        <div className="logo">
          <Link to="/"><h2>PANDEA</h2></Link>
        </div>

        {/* Nav links — se oculta en móvil */}
        <nav>
          <ul id="navbar" className={menuOpen ? "show" : ""}>
            <li><Link to="/"      className={isActive("/")      ? "active" : ""} onClick={() => setMenuOpen(false)}>Inicio</Link></li>
            <li><Link to="/shop"  className={isActive("/shop")  ? "active" : ""} onClick={() => setMenuOpen(false)}>Productos</Link></li>
            <li><Link to="/shop"  className=""                                   onClick={() => setMenuOpen(false)}>Categorias</Link></li>
            <li><Link to="/about" className={isActive("/about") ? "active" : ""} onClick={() => setMenuOpen(false)}>Acerca De</Link></li>
          </ul>
        </nav>

        {/* Iconos derecha */}
        <div className="nav-icons">

          {/* Búsqueda — solo desktop */}
          <div className="search-bar desktop-only">
            <input type="text" placeholder="Buscar..." />
            <button><i className="fas fa-search" /></button>
          </div>

          {/* Carrito */}
          <a href="#" className="cart-icon-wrap" onClick={(e) => { e.preventDefault(); openCart(); }}>
            <i className="fas fa-shopping-bag" />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </a>

          {/* Login / Perfil */}
          {user ? (
            <div className="profile-wrap">
              <button className="button-login" onClick={() => setProfileOpen(p => !p)}>
                <i className="fas fa-user-check" /> <span className="login-text">{user.getFirstName()}</span>
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <i className="fas fa-user-circle" />
                    <span>{user.displayName}</span>
                    <small>{user.email}</small>
                  </div>
                  <hr />
                  <button onClick={() => { logout(); setProfileOpen(false); }}>
                    <i className="fas fa-sign-out-alt" /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="button-login" onClick={() => setModal("login")}>
              Login
            </button>
          )}

          {/* Hamburguesa — solo móvil */}
          <button className="hamburger" onClick={() => setMenuOpen(p => !p)}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`} />
          </button>

        </div>
      </header>

      {/* Modales */}
      {modal === "login"    && <LoginModal    onClose={() => setModal(null)} onRegister={() => setModal("register")} onForgot={() => setModal("forgot")} />}
      {modal === "register" && <RegisterModal onClose={() => setModal(null)} onLogin={() => setModal("login")} />}
      {modal === "forgot"   && <ForgotModal   onClose={() => setModal(null)} onLogin={() => setModal("login")} />}
    </>
  );
}
