/*
  HIBAH CROCHET SHOP — EDIT YOUR PRODUCTS HERE
  1. Change flower names and prices in FLOWERS.
  2. Change ready-made bouquet and shop product names/prices below.
  3. Add your WhatsApp number in WHATSAPP_NUMBER, using country code only.
*/

const WHATSAPP_NUMBER = ""; // Example UAE format: 9715XXXXXXXX (no +, spaces or dashes)

const FLOWERS = [
  { id: "tulip", name: "Crochet tulip", price: 15, emoji: "🌷", colour: "#f0d9d6" },
  { id: "rose", name: "Crochet rose", price: 20, emoji: "🌹", colour: "#ead4d5" },
  { id: "daisy", name: "Crochet daisy", price: 12, emoji: "🌼", colour: "#f0e8c9" },
  { id: "sunflower", name: "Crochet sunflower", price: 18, emoji: "🌻", colour: "#eee0b8" },
  { id: "lavender", name: "Lavender stem", price: 10, emoji: "🪻", colour: "#e1d9ec" },
  { id: "lily", name: "Crochet lily", price: 22, emoji: "🌸", colour: "#f0dcd9" }
];

const READY_MADE = [
  { name: "The Tulip Bunch", description: "A sweet bunch of crochet tulips", price: 65, emoji: "💐", colour: "#e6d9d2" },
  { name: "Soft Pastels", description: "A gentle mix of pastel blooms", price: 85, emoji: "🌷", colour: "#dce4d8" },
  { name: "The Little Rose Bouquet", description: "Roses for your favourite person", price: 95, emoji: "🌹", colour: "#ead5d8" }
];

const SHOP_PRODUCTS = [
  { name: "Flower Keychain", category: "Keychains", description: "A tiny flower to take everywhere", price: 10, emoji: "🌼", colour: "#eee4c9" },
  { name: "Heart Keychain", category: "Keychains", description: "A little handmade heart", price: 12, emoji: "♡", colour: "#ead5d8" },
  { name: "Crochet Scrunchie", category: "Scrunchies", description: "Soft, handmade, and cute", price: 12, emoji: "🎀", colour: "#e7d9e5" },
  { name: "Crochet Gajra", category: "Gajray", description: "A handmade floral accessory", price: 25, emoji: "🌸", colour: "#e5e8d8" },
  { name: "Mini Crochet Bag", category: "Bags", description: "A little bag made stitch by stitch", price: 65, emoji: "👜", colour: "#e9dfd0" },
  { name: "Lavender Keychain", category: "Keychains", description: "A tiny lavender-inspired gift", price: 10, emoji: "🪻", colour: "#ddd8ea" }
];

const quantities = Object.fromEntries(FLOWERS.map(flower => [flower.id, 0]));
const flowerList = document.getElementById("flowerList");
const summaryItems = document.getElementById("summaryItems");
const wrappingSelect = document.getElementById("wrapping");
const giftCardCheckbox = document.getElementById("giftCard");
const noteInput = document.getElementById("customerNote");

const money = amount => `AED ${amount.toFixed(2)}`;

function renderFlowers() {
  flowerList.innerHTML = FLOWERS.map(flower => `
    <article class="flower-card">
      <div class="flower-emoji" style="background:${flower.colour}">${flower.emoji}</div>
      <div class="flower-info">
        <h3>${flower.name}</h3>
        <p>${money(flower.price)} each</p>
        <div class="quantity">
          <button type="button" aria-label="Remove one ${flower.name}" data-action="minus" data-id="${flower.id}">−</button>
          <span id="qty-${flower.id}">0</span>
          <button type="button" aria-label="Add one ${flower.name}" data-action="plus" data-id="${flower.id}">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-image" style="background:${product.colour}">
        <span class="placeholder-art">${product.emoji}</span>
        <span class="photo-tip">Replace this placeholder with your product photo</span>
      </div>
      <div class="product-meta">
        <div><h3>${product.name}</h3><p>${product.description}</p></div>
        <span class="product-price">${money(product.price)}</span>
      </div>
    </article>
  `).join("");
}

function updateSummary() {
  const selected = FLOWERS.filter(flower => quantities[flower.id] > 0);
  const flowerSubtotal = selected.reduce((sum, flower) => sum + flower.price * quantities[flower.id], 0);
  const wrapping = Number(wrappingSelect.value);
  const giftCard = giftCardCheckbox.checked ? 5 : 0;
  const extras = wrapping + giftCard;

  summaryItems.innerHTML = selected.length
    ? selected.map(flower => `
      <div class="summary-line">
        <span>${flower.name} × ${quantities[flower.id]}</span>
        <span>${money(flower.price * quantities[flower.id])}</span>
      </div>`).join("")
    : '<p class="empty-state">Your flowers will appear here 🌷</p>';

  document.getElementById("flowerSubtotal").textContent = money(flowerSubtotal);
  document.getElementById("extrasTotal").textContent = money(extras);
  document.getElementById("grandTotal").textContent = money(flowerSubtotal + extras);

  FLOWERS.forEach(flower => {
    const quantityLabel = document.getElementById(`qty-${flower.id}`);
    if (quantityLabel) quantityLabel.textContent = quantities[flower.id];
  });
}

flowerList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = button.dataset.id;
  if (button.dataset.action === "plus") quantities[id]++;
  if (button.dataset.action === "minus") quantities[id] = Math.max(0, quantities[id] - 1);
  updateSummary();
});

wrappingSelect.addEventListener("change", updateSummary);
giftCardCheckbox.addEventListener("change", updateSummary);

document.getElementById("orderBouquet").addEventListener("click", () => {
  const selected = FLOWERS.filter(flower => quantities[flower.id] > 0);
  if (!selected.length) {
    alert("Add at least one flower to your bouquet first 🌷");
    return;
  }
  const flowerSubtotal = selected.reduce((sum, flower) => sum + flower.price * quantities[flower.id], 0);
  const wrappingLabel = wrappingSelect.options[wrappingSelect.selectedIndex].text;
  const extras = Number(wrappingSelect.value) + (giftCardCheckbox.checked ? 5 : 0);
  const total = flowerSubtotal + extras;
  const orderLines = selected.map(flower => `• ${flower.name} x ${quantities[flower.id]} — ${money(flower.price * quantities[flower.id])}`).join("\n");
  const note = noteInput.value.trim();
  const message = `Hi! I'd like to order a custom crochet bouquet 💐\n\n${orderLines}\n\n${wrappingLabel}\nGift card: ${giftCardCheckbox.checked ? "Yes (+ AED 5)" : "No"}${note ? `\nMy note: ${note}` : ""}\n\nTotal: ${money(total)}\n\nPlease let me know how to proceed!`;
  if (!WHATSAPP_NUMBER) {
    alert("The bouquet order message is ready, but the shop WhatsApp number hasn't been added yet. Open script.js and fill in WHATSAPP_NUMBER.");
    window.prompt("Copy your bouquet order message:", message);
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

document.getElementById("shopFilters").addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(filter => filter.classList.toggle("active", filter === button));
  const filter = button.dataset.filter;
  renderProducts(filter === "all" ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter(product => product.category === filter), "shopGrid");
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll("#navLinks a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("navLinks").classList.remove("open");
}));

document.getElementById("year").textContent = new Date().getFullYear();
renderFlowers();
renderProducts(READY_MADE, "readyMadeGrid");
renderProducts(SHOP_PRODUCTS, "shopGrid");
updateSummary();
