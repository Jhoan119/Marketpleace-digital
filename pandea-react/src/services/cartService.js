import { CartModel } from "../models/Cart";

export const cartService = {
  addToCart(cart, product) {
    return cart.addItem(product);
  },

  removeFromCart(cart, productId) {
    return cart.removeItem(productId);
  },

  updateQuantity(cart, productId, quantity) {
    if (quantity <= 0) return cartService.removeFromCart(cart, productId);
    return new CartModel(
      cart.items.map(i => i.id === productId ? { ...i, quantity } : i)
    );
  },

  clearCart() {
    return new CartModel([]);
  }
};
