import { useState } from "react";
import { useAuthController } from "../../../controllers/useAuthController";

export default function ForgotModal({ onClose, onLogin }) {
  const { resetPassword, loading, error, clearError } = useAuthController();
  const [email,   setEmail]   = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await resetPassword(email);
    if (ok) setSuccess(true);
  }

  return (
    <div className="modal open" onClick={(e) => e.target.classList.contains("modal") && onClose()}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="form-header">
          <h2>Recuperar contraseña</h2>
          <p>Ingresa tu correo para recibir instrucciones</p>
        </div>
        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <i className="fas fa-envelope-open-text" style={{ fontSize: 48, color: "#1a7f52", marginBottom: 16 }} />
            <p>¡Correo enviado! Revisa tu bandeja de entrada.</p>
            <button className="btn-submit" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label>CORREO ELECTRÓNICO</label>
            <div className="input-group">
              <i className="fas fa-envelope" />
              <input type="email" placeholder="correo@ejemplo.com" value={email}
                onChange={e => { setEmail(e.target.value); clearError(); }} required />
            </div>
            {error && <span className="auth-error">{error}</span>}
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Cargando...</> : "Enviar instrucciones"}
            </button>
          </form>
        )}
        <div className="divider"><span>¿Recordaste tu contraseña?</span></div>
        <button className="btn-outline" onClick={onLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
}
