import { ProductModel } from "../models/Product";

const rawProducts = [
  { id: 1,  name: "Camisa Casual Azul",     price: 85000,  img: "/products/f1.jpg",  category: "camisa" },
  { id: 2,  name: "Camisa Slim Fit",         price: 95000,  img: "/products/f2.jpg",  category: "camisa" },
  { id: 3,  name: "Camisa Lino Blanca",      price: 90000,  img: "/products/f3.jpg",  category: "camisa" },
  { id: 4,  name: "Camisa Oxford",           price: 88000,  img: "/products/f4.jpg",  category: "camisa" },
  { id: 5,  name: "Suéter Clásico",          price: 120000, img: "/products/f5.jpg",  category: "sueter" },
  { id: 6,  name: "Pantalón Chino",          price: 110000, img: "/products/f6.jpg",  category: "pantalon" },
  { id: 7,  name: "Blusa Floral",            price: 75000,  img: "/products/f7.jpg",  category: "blusa" },
  { id: 8,  name: "Camisa Rayas",            price: 92000,  img: "/products/f8.jpg",  category: "camisa" },
  { id: 9,  name: "Camisa Manga Larga",      price: 98000,  img: "/products/f9.jpg",  category: "camisa" },
  { id: 10, name: "Camisa Cuadros",          price: 87000,  img: "/products/f10.jpg", category: "camisa" },
  { id: 11, name: "Camisa Bordada",          price: 105000, img: "/products/f11.jpg", category: "camisa" },
  { id: 12, name: "Camisa Oversize",         price: 93000,  img: "/products/f12.jpg", category: "camisa" },
];

export const productService = {
  getAll() {
    return rawProducts.map(p => new ProductModel(p));
  },

  getByCategory(category) {
    if (category === "all") return this.getAll();
    return this.getAll().filter(p => p.category === category);
  },

  search(query) {
    const q = query.toLowerCase();
    return this.getAll().filter(p => p.name.toLowerCase().includes(q));
  },

  getById(id) {
    const product = rawProducts.find(p => p.id === id);
    return product ? new ProductModel(product) : null;
  }
};
