import { useState } from "react";
import { authService } from "../services/authService";

export function useAuthController() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const clearError = () => setError("");

  async function login(email, password) {
    setLoading(true); setError("");
    try {
      await authService.login(email, password);
      return true;
    } catch (err) {
      setError(authService.translateError(err.code));
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(name, email, password) {
    setLoading(true); setError("");
    try {
      await authService.register(name, email, password);
      return true;
    } catch (err) {
      setError(authService.translateError(err.code));
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(email) {
    setLoading(true); setError("");
    try {
      await authService.resetPassword(email);
      return true;
    } catch (err) {
      setError(authService.translateError(err.code));
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await authService.logout();
  }

  return { login, register, resetPassword, logout, loading, error, clearError };
}
