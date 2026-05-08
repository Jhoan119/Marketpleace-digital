export class ProductModel {
  constructor({ id, name, price, img, category, brand = "Pandea" }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.category = category;
    this.brand = brand;
  }

  getFormattedPrice() {
    return `$${this.price.toLocaleString()}`;
  }
}
