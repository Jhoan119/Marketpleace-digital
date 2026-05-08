import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut
} from "firebase/auth";
import { auth } from "../config/firebase";
import { UserModel } from "../models/User";

export const authService = {
  async register(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    return new UserModel({
      uid: cred.user.uid,
      displayName: name,
      email: cred.user.email,
    });
  },

  async login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return new UserModel({
      uid: cred.user.uid,
      displayName: cred.user.displayName,
      email: cred.user.email,
    });
  },

  async logout() {
    await signOut(auth);
  },

  async resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  },

  translateError(code) {
    const errors = {
      "auth/email-already-in-use":   "Este correo ya está registrado.",
      "auth/invalid-email":          "El correo no es válido.",
      "auth/weak-password":          "La contraseña debe tener al menos 6 caracteres.",
      "auth/user-not-found":         "No existe una cuenta con ese correo.",
      "auth/wrong-password":         "Contraseña incorrecta.",
      "auth/invalid-credential":     "Correo o contraseña incorrectos.",
      "auth/too-many-requests":      "Demasiados intentos. Espera un momento.",
      "auth/network-request-failed": "Sin conexión a internet.",
    };
    return errors[code] || "Ocurrió un error. Inténtalo de nuevo.";
  }
};
