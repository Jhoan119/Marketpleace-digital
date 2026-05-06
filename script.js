// ============================
//   CARRITO — PANDEA
// ============================

// Cargar carrito desde localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elementos del DOM
const cartIcon = document.querySelector('.bi-bag-heart');
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ============================
//   LISTA DE PRODUCTOS
// ============================

const products = [
    { id: 1, name: "Camisa Colorida Abstracta", price: 79900, img: "products/f1.jpg" },
    { id: 2, name: "Camisa Floral Tropical", price: 74900, img: "products/f2.jpg" },
    { id: 3, name: "Camisa Floral Vintage", price: 69900, img: "products/f3.jpg" },
    { id: 4, name: "Camisa Blanca con Rosas", price: 64900, img: "products/f4.jpg" },
    { id: 5, name: "Suéter con camisa blanca", price: 82000, img: "products/f5.jpg" },
    { id: 6, name: "Pantalón corto", price: 82000, img: "products/f6.jpg" },
    { id: 7, name: "Blusa marrón", price: 82000, img: "products/f7.jpg"  },
    { id: 8, name: "Camisa azul manga larga", price: 82000, img: "products/f8.jpg" },
    { id: 9, name: "Camisa cuadros manga larga", price: 82000, img: "products/f9.jpg" },
    { id: 10, name: "Camisa blanca manga larga", price: 82000, img: "products/f10.jpg" },
    { id: 11, name: "Camisa negra manga corta", price: 82000, img: "products/f11.jpg" },
    { id: 12, name: "Camisa Style Mach manga corta", price: 82000, img: "products/f12.jpg" },
];

// ============================
//   CONTADOR DEL CARRITO
// ============================

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.getElementById("cart-count");

    if (count > 0) {
        counter.style.display = "inline-block";
        counter.textContent = count;
    } else {
        counter.style.display = "none";
    }
}

// ============================
//   AGREGAR AL CARRITO
// ============================

function addToCart(product) {
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
        exists.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartDisplay();
    updateCartCount();
    cartSidebar.classList.add("show");
}

// ============================
//   CAMBIAR CANTIDAD (+ / -)
// ============================

function changeQuantity(id, action) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease") {
        item.quantity -= 1;

        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
    }

    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// ============================
//   ELIMINAR PRODUCTO
// ============================

function removeItem(id) {
    const index = cart.findIndex(p => p.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// ============================
//   MOSTRAR CARRITO EN PANTALLA
// ============================

function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-item-img">
              <img src="${item.img}" alt="${item.name}">
                </div>
              
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                <span>Precio: $${item.price.toLocaleString()}</span>

            <div class="quantity-control">
                <button class="qty-btn decrease" data-id="${item.id}">−</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn increase" data-id="${item.id}">+</button>
            </div>

            <button class="remove-item" data-id="${item.id}">Eliminar</button>
        `;

        cartItemsContainer.appendChild(div);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toLocaleString()}`;

    // Botones aumentar
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            changeQuantity(id, "increase");
        });
    });

    // Botones disminuir
    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            changeQuantity(id, "decrease");
        });
    });

    // Botones eliminar
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            removeItem(id);
        });
    });
}

// ============================
//   EVENTOS DEL DOM
// ============================

// Detectar clic de "Agregar al carrito"
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", e => {
        e.preventDefault();
        const id = parseInt(button.getAttribute("data-id"));
        const product = products.find(p => p.id === id);
        if (product) {
            addToCart(product);
        }
    });
});

// Abrir carrito
cartIcon.addEventListener("click", e => {
    e.preventDefault();
    updateCartDisplay();
    cartSidebar.classList.add("show");
});

// Cerrar carrito
closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("show");
});

// Mostrar contador y carrito si ya había productos
updateCartDisplay();
updateCartCount();
