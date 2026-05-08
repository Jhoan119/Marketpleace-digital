import { createContext, useContext, useState } from "react";
import { CartModel } from "../models/Cart";
import { cartService } from "../services/cartService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(new CartModel());
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => cartService.addToCart(prev, product));
  };

  const removeFromCart = (productId) => {
    setCart(prev => cartService.removeFromCart(prev, productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prev => cartService.updateQuantity(prev, productId, quantity));
  };

  const clearCart = () => {
    setCart(cartService.clearCart());
  };

  const openCart  = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{
      cart, isOpen,
      addToCart, removeFromCart, updateQuantity, clearCart,
      openCart, closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
