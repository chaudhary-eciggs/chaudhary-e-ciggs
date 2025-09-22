let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Product data
const products = [
  { name: "Wireless Headphones", price: 50, category: "electronics", img: "https://via.placeholder.com/250x200?text=Headphones" },
  { name: "Smartwatch", price: 75, category: "electronics", img: "https://via.placeholder.com/250x200?text=Smartwatch" },
  { name: "Gaming Mouse", price: 30, category: "electronics", img: "https://via.placeholder.com/250x200?text=Mouse" },
  { name: "Bluetooth Speaker", price: 40, category: "electronics", img: "https://via.placeholder.com/250x200?text=Speaker" },
  { name: "T-Shirt", price: 20, category: "fashion", img: "https://via.placeholder.com/250x200?text=T-Shirt" },
  { name: "Jeans", price: 35, category: "fashion", img: "https://via.placeholder.com/250x200?text=Jeans" },
  { name: "Sofa Cushion", price: 25, category: "home", img: "https://via.placeholder.com/250x200?text=Cushion" },
  { name: "Table Lamp", price: 45, category: "home", img: "https://via.placeholder.com/250x200?text=Lamp" },
];

// Render products
function renderProducts(list) {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";
  list.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

renderProducts(products);

// Cart Functions
function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(product + " added to cart!");
}

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = cart.length;
  });
}

function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.product} - $${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.innerText = "Total: $" + total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  loadCart();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  loadCart();
}

// Filters
function filterCategory(cat) {
  if (cat === "all") renderProducts(products);
  else renderProducts(products.filter(p => p.category === cat));
}

// Search
document.getElementById("search")?.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Load cart on cart.html
window.onload = loadCart;
