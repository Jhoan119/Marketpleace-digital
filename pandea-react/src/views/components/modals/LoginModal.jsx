import { useState } from "react";
import { useAuthController } from "../../../controllers/useAuthController";

export default function LoginModal({ onClose, onRegister, onForgot }) {
  const { login, loading, error, clearError } = useAuthController();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) onClose();
  }

  return (
    <div className="modal open" onClick={(e) => e.target.classList.contains("modal") && onClose()}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="form-header">
          <h2>Iniciar sesión</h2>
          <p>Accede a tu cuenta de Pandea</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label>CORREO ELECTRÓNICO</label>
          <div className="input-group">
            <i className="fas fa-envelope" />
            <input type="email" placeholder="correo@ejemplo.com" value={email}
              onChange={e => { setEmail(e.target.value); clearError(); }} required />
          </div>
          <label>CONTRASEÑA</label>
          <div className="input-group">
            <i className="fas fa-lock" />
            <input type={showPass ? "text" : "password"} placeholder="••••••••" value={password}
              onChange={e => { setPassword(e.target.value); clearError(); }} required />
            <i className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"} toggle-pass`}
               onClick={() => setShowPass(p => !p)} />
          </div>
          <div style={{ textAlign: "right", marginBottom: 12 }}>
            <span className="link-text" onClick={onForgot}>¿Olvidaste tu contraseña?</span>
          </div>
          {error && <span className="auth-error">{error}</span>}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <><span className="spinner" /> Cargando...</> : "Iniciar sesión"}
          </button>
        </form>
        <div className="divider"><span>¿Nuevo en Pandea?</span></div>
        <button className="btn-outline" onClick={onRegister}>Crear una cuenta</button>
      </div>
    </div>
  );
}
