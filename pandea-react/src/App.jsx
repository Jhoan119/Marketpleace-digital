import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./views/layouts/MainLayout";
import Home  from "./views/pages/Home";
import Shop  from "./views/pages/Shop";
import About from "./views/pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <MainLayout>
            <Routes>
              <Route path="/"      element={<Home />}  />
              <Route path="/shop"  element={<Shop />}  />
              <Route path="/about" element={<About />} />
            </Routes>
          </MainLayout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
