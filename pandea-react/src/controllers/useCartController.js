import { useCart } from "../context/CartContext";

export function useCartController() {
  const { cart, isOpen, addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart } = useCart();

  function handleAddToCart(product) {
    addToCart(product);
    openCart();
  }

  return {
    items:    cart.items,
    total:    cart.getTotal(),
    count:    cart.getItemCount(),
    isOpen,
    handleAddToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };
}
