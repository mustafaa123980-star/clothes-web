// Products Data
const products = [
  {
    id: 1,
    name: "قميص رجالي كلاسيكي",
    category: "رجالي",
    price: 149,
    oldPrice: 199,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    badge: "خصم 25%",
  },
  {
    id: 2,
    name: "فستان نسائي أنيق",
    category: "نسائي",
    price: 249,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
    badge: "جديد",
  },
  {
    id: 3,
    name: "جاكيت جلد فاخر",
    category: "رجالي",
    price: 399,
    oldPrice: 549,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    badge: "خصم 27%",
  },
  {
    id: 4,
    name: "بلوزة نسائية صيفية",
    category: "نسائي",
    price: 99,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400",
    badge: null,
  },
  {
    id: 5,
    name: "بنطلون جينز عصري",
    category: "رجالي",
    price: 179,
    oldPrice: 229,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400",
    badge: "الأكثر مبيعاً",
  },
  {
    id: 6,
    name: "فستان سهرة أحمر",
    category: "نسائي",
    price: 349,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    badge: "مميز",
  },
  {
    id: 7,
    name: "تيشيرت أطفال ملون",
    category: "أطفال",
    price: 59,
    oldPrice: 79,
    image: "https://images.unsplash.com/photo-1519278407-7e5f4b54cc6a?w=400",
    badge: "خصم 25%",
  },
  {
    id: 8,
    name: "حذاء رياضي عصري",
    category: "أحذية",
    price: 299,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    badge: "جديد",
  },
];

let cart = [
  {
    id: 1,
    name: "قميص رجالي كلاسيكي",
    price: 149,
    qty: 1,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100",
  },
  {
    id: 2,
    name: "فستان نسائي أنيق",
    price: 249,
    qty: 1,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100",
  },
];

let currentModalProduct = null;

// Initialize
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1000);
  renderProducts();
  renderCart();
});

// Render Products
function renderProducts(filter = "الكل") {
  const grid = document.getElementById("productsGrid");
  const filtered =
    filter === "الكل"
      ? products
      : products.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (product) => `
                <div class="product-card" data-category="${product.category}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-actions">
                            <button class="action-btn" onclick="openModal(${product.id})" title="معاينة سريعة">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" onclick="addToCart(${product.id})" title="أضف للسلة">
                                <i class="fas fa-shopping-bag"></i>
                            </button>
                            <button class="action-btn" title="المفضلة">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">
                            <span class="current-price">${product.price} جنيه</span>
                            ${product.oldPrice ? `<span class="old-price">${product.oldPrice} جنيه</span>` : ""}
                        </div>
                    </div>
                </div>
            `,
    )
    .join("");
}

// Filter Buttons
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    renderProducts(this.textContent);
  });
});

// Cart Functions
function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

document.querySelector(".cart-trigger").addEventListener("click", toggleCart);
document.getElementById("overlay").addEventListener("click", toggleCart);

function renderCart() {
  const container = document.getElementById("cartItems");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  container.innerHTML = cart
    .map(
      (item) => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price} جنيه</div>
                        <div class="cart-item-quantity">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                        <span class="remove-item" onclick="removeFromCart(${item.id})">حذف</span>
                    </div>
                </div>
            `,
    )
    .join("");

  document.getElementById("cartTotal").textContent = total + " جنيه";
  document.getElementById("cartCount").textContent = cart.length;
  document.querySelector(".cart-count").textContent = cart.length;
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image,
    });
  }

  renderCart();
  showToast("تمت إضافة المنتج إلى السلة");
}

function addToCartFromModal() {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id);
    closeModal();
  }
}

function updateQty(id, change) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      removeFromCart(id);
    } else {
      renderCart();
    }
  }
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

// Modal Functions
function openModal(productId) {
  const product = products.find((p) => p.id === productId);
  currentModalProduct = product;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalPrice").textContent = product.price + " جنيه";

  document.getElementById("quickViewModal").classList.add("active");
}

function closeModal() {
  document.getElementById("quickViewModal").classList.remove("active");
}

// Close modal on outside click
document
  .getElementById("quickViewModal")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

// Size selection
document.querySelectorAll(".size-option").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".size-option")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
  });
});

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  document.getElementById("toastMessage").textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
  }
});
