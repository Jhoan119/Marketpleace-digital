export class CartModel {
  constructor(items = []) {
    this.items = items;
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  addItem(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      return new CartModel(
        this.items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      );
    }
    return new CartModel([...this.items, { ...product, quantity: 1 }]);
  }

  removeItem(productId) {
    return new CartModel(this.items.filter(i => i.id !== productId));
  }
}
