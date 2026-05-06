// ============================================================
//   PANDEA — AUTENTICACIÓN CON FIREBASE + EMAILJS
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── Configuración Firebase ──────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAHtQ0E74_tAyyFCoYrJNDLQqGb7U2DrS0",
  authDomain: "pandea-tienda.firebaseapp.com",
  projectId: "pandea-tienda",
  storageBucket: "pandea-tienda.firebasestorage.app",
  messagingSenderId: "1027160232171",
  appId: "1:1027160232171:web:8fe399396619b2e4702eae",
  measurementId: "G-NM1CRLQXG4"
};

// ── Configuración EmailJS ───────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_bituclu";
const EMAILJS_TEMPLATE_ID = "template_i6l3ato";
const EMAILJS_PUBLIC_KEY  = "3C5Kfqa0YcLtkzeEp";

// ── Inicializar Firebase ────────────────────────────────────
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Inicializar EmailJS ─────────────────────────────────────
emailjs.init(EMAILJS_PUBLIC_KEY);

// ============================================================
//   HELPERS UI
// ============================================================

function showToast(message, type = "success") {
  let toast = document.getElementById("auth-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "auth-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `auth-toast show ${type}`;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("show"), 3500);
}

function setLoading(btn, loading) {
  if (loading) {
    btn.disabled = true;
    btn.dataset.originalText = btn.textContent;
    btn.innerHTML = '<span class="spinner"></span> Cargando...';
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText || btn.textContent;
  }
}

function clearErrors() {
  document.querySelectorAll(".auth-error").forEach(el => el.textContent = "");
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

// Traduce errores de Firebase al español
function translateError(code) {
  const errors = {
    "auth/email-already-in-use":    "Este correo ya está registrado.",
    "auth/invalid-email":           "El correo no es válido.",
    "auth/weak-password":           "La contraseña debe tener al menos 6 caracteres.",
    "auth/user-not-found":          "No existe una cuenta con ese correo.",
    "auth/wrong-password":          "Contraseña incorrecta.",
    "auth/invalid-credential":      "Correo o contraseña incorrectos.",
    "auth/too-many-requests":       "Demasiados intentos. Espera un momento.",
    "auth/network-request-failed":  "Sin conexión a internet.",
    "auth/user-disabled":           "Esta cuenta ha sido desactivada.",
  };
  return errors[code] || "Ocurrió un error. Inténtalo de nuevo.";
}

// ============================================================
//   ESTADO DE SESIÓN — actualiza el botón Login/Perfil
// ============================================================

onAuthStateChanged(auth, (user) => {
  const loginBtn = document.querySelector(".button-login");
  if (!loginBtn) return;

  if (user) {
    const name = user.displayName ? user.displayName.split(" ")[0] : "Mi cuenta";
    loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${name}`;
    loginBtn.onclick = () => openProfileMenu();
  } else {
    loginBtn.innerHTML = "Login";
    loginBtn.onclick = () => openLoginModal();
  }
});

// ── Menú desplegable del perfil ─────────────────────────────
function openProfileMenu() {
  let menu = document.getElementById("profile-dropdown");
  if (menu) { menu.remove(); return; }

  menu = document.createElement("div");
  menu.id = "profile-dropdown";
  menu.className = "profile-dropdown";

  const user = auth.currentUser;
  menu.innerHTML = `
    <div class="profile-info">
      <i class="fas fa-user-circle"></i>
      <span>${user?.displayName || "Usuario"}</span>
      <small>${user?.email || ""}</small>
    </div>
    <hr>
    <button onclick="handleSignOut()"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
  `;

  document.querySelector(".nav-icons")?.appendChild(menu);

  // Cerrar al hacer clic afuera
  setTimeout(() => {
    document.addEventListener("click", function handler(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener("click", handler);
      }
    });
  }, 50);
}

window.handleSignOut = async function () {
  await signOut(auth);
  document.getElementById("profile-dropdown")?.remove();
  showToast("Sesión cerrada correctamente.", "success");
};

// ============================================================
//   MODALES — abrir / cerrar
// ============================================================

window.openLoginModal    = () => document.getElementById("modal-login")?.classList.add("open");
window.closeLoginModal   = () => document.getElementById("modal-login")?.classList.remove("open");
window.openRegisterModal = () => { closeLoginModal(); document.getElementById("modal-register")?.classList.add("open"); };
window.closeRegisterModal= () => document.getElementById("modal-register")?.classList.remove("open");
window.openForgotModal   = () => { closeLoginModal(); document.getElementById("modal-forgot")?.classList.add("open"); };
window.closeForgotModal  = () => document.getElementById("modal-forgot")?.classList.remove("open");

window.switchToLogin = () => {
  closeRegisterModal();
  closeForgotModal();
  openLoginModal();
};

window.handleModalClick = (e) => {
  if (e.target.classList.contains("modal")) e.target.classList.remove("open");
};

// ── Toggle contraseña visible ───────────────────────────────
window.togglePass = () => togglePasswordVisibility("password", "eye-icon");
window.togglePassRegister = () => togglePasswordVisibility("register-password", "register-eye-icon");

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon  = document.getElementById(iconId);
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
  icon?.classList.toggle("fa-eye");
  icon?.classList.toggle("fa-eye-slash");
}

// ============================================================
//   LOGIN
// ============================================================

document.getElementById("login-form")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  clearErrors();

  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const btn      = this.querySelector("button[type='submit']");

  if (!email || !password) {
    showError("login-error", "Completa todos los campos.");
    return;
  }

  setLoading(btn, true);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    closeLoginModal();
    showToast("¡Bienvenido de nuevo! 👋", "success");
    this.reset();
  } catch (err) {
    showError("login-error", translateError(err.code));
  } finally {
    setLoading(btn, false);
  }
});

// ============================================================
//   REGISTRO
// ============================================================

document.getElementById("register-form")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  clearErrors();

  const name     = document.getElementById("register-name").value.trim();
  const email    = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;
  const confirm  = document.getElementById("register-confirm-password").value;
  const btn      = this.querySelector("button[type='submit']");

  if (!name || !email || !password || !confirm) {
    showError("register-error", "Completa todos los campos.");
    return;
  }

  if (password.length < 6) {
    showError("register-error", "La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  if (password !== confirm) {
    showError("register-error", "Las contraseñas no coinciden.");
    return;
  }

  setLoading(btn, true);

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    closeRegisterModal();
    showToast(`¡Cuenta creada! Bienvenido, ${name} 🎉`, "success");
    this.reset();
  } catch (err) {
    showError("register-error", translateError(err.code));
  } finally {
    setLoading(btn, false);
  }
});

// ============================================================
//   RECUPERAR CONTRASEÑA — Firebase envía el correo
// ============================================================

document.getElementById("forgot-form")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  clearErrors();

  const email = document.getElementById("forgot-email").value.trim();
  const btn   = this.querySelector("button[type='submit']");

  if (!email) {
    showError("forgot-error", "Ingresa tu correo electrónico.");
    return;
  }

  setLoading(btn, true);

  try {
    await sendPasswordResetEmail(auth, email);
    closeForgotModal();
    showToast("📧 Correo enviado. Revisa tu bandeja de entrada.", "success");
    this.reset();
  } catch (err) {
    console.error("Error recuperación:", err.code, err.message);
    showError("forgot-error", translateError(err.code));
  } finally {
    setLoading(btn, false);
  }
});
