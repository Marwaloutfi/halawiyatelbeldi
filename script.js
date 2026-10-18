const categoriesData = storeData.categories;
let cart = [];
let activeCategory = categoriesData[0].id;

document.addEventListener('DOMContentLoaded', () => {
    renderCategoryTabs();
    renderProducts(activeCategory);
    updateCartUI();
});

// Style de catégories type Shein / Temu (Cartes glissantes élégantes)
function renderCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    tabsContainer.innerHTML = categoriesData.map(cat => `
        <div class="cat-card-tab ${cat.id === activeCategory ? 'active' : ''}" onclick="switchCategory('${cat.id}')">
            <span>${cat.name}</span>
        </div>
    `).join('');
}

function switchCategory(catId) {
    activeCategory = catId;
    renderCategoryTabs();
    renderProducts(activeCategory);
}

function renderProducts(catId) {
    const category = categoriesData.find(c => c.id === catId);
    const grid = document.getElementById('productsGrid');

    grid.innerHTML = category.items.map(product => `
        <div class="product-card ${!product.inStock ? 'is-sold-out' : ''}">
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="price-indicator">
                    Prix de base : <strong>${product.basePrice} DH</strong> par ${product.baseUnit}
                </div>
                
                <div class="calc-box" style="${!product.inStock ? 'opacity: 0.5; pointer-events: none;' : ''}">
                    <span class="calc-label">Quantité souhaitée :</span>
                    <div class="calc-inputs">
                        <input type="number" id="qty-${product.id}" value="500" min="50" step="50" oninput="calculatePrice('${product.id}', ${product.basePrice}, '${product.baseUnit}')">
                        <select id="unit-${product.id}" onchange="calculatePrice('${product.id}', ${product.basePrice}, '${product.baseUnit}')">
                            <option value="g" selected>g</option>
                            <option value="kg">kg</option>
                            <option value="pcs">unités</option>
                        </select>
                    </div>
                    <div class="conversion-result">
                        <span>Total Estimé :</span>
                        <span class="calculated-price" id="calc-price-${product.id}">--</span>
                    </div>
                </div>

                <button class="add-to-cart-btn ${!product.inStock ? 'sold-out-btn' : ''}" 
                    onclick="${product.inStock ? `addToCart('${product.id}', '${product.name}', ${product.basePrice}, '${product.baseUnit}')` : 'return false;'}"
                    ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? '<i class="fa-solid fa-bag-shopping"></i> Ajouter au Panier' : '<i class="fa-solid fa-ban"></i> Épuisé (Sold Out)'}
                </button>
            </div>
        </div>
    `).join('');

    category.items.forEach(product => {
        if(product.inStock) {
            calculatePrice(product.id, product.basePrice, product.baseUnit);
        }
    });
}

function calculatePrice(productId, basePrice, baseUnit) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const unitSelect = document.getElementById(`unit-${productId}`);
    const priceDisplay = document.getElementById(`calc-price-${productId}`);
    
    if(!qtyInput || !unitSelect || !priceDisplay) return;

    let amount = parseFloat(qtyInput.value) || 0;
    let unit = unitSelect.value;
    let finalPrice = 0;

    if (baseUnit === 'box') {
        finalPrice = amount * basePrice;
    } else {
        if (unit === 'g') {
            finalPrice = (amount / 1000) * basePrice;
        } else if (unit === 'kg') {
            finalPrice = amount * basePrice;
        } else if (unit === 'pcs') {
            finalPrice = (amount * (basePrice / 20)); 
        }
    }

    priceDisplay.textContent = `${Math.round(finalPrice)} DH`;
}

function addToCart(productId, productName, basePrice, baseUnit) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const unitSelect = document.getElementById(`unit-${productId}`);
    
    let amount = parseFloat(qtyInput.value);
    let unit = unitSelect.value;

    if (!amount || amount <= 0) {
        alert('Veuillez entrer une quantité valide.');
        return;
    }

    let calculatedPrice = 0;
    if (baseUnit === 'box') {
        calculatedPrice = amount * basePrice;
    } else {
        if (unit === 'g') calculatedPrice = (amount / 1000) * basePrice;
        else if (unit === 'kg') calculatedPrice = amount * basePrice;
        else if (unit === 'pcs') calculatedPrice = (amount * (basePrice / 20));
    }

    const cartItem = {
        id: `${productId}-${Date.now()}`,
        name: productName,
        quantityText: `${amount}${unit}`,
        price: Math.round(calculatedPrice)
    };

    cart.push(cartItem);
    updateCartUI();
    showToast();
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const itemsList = document.getElementById('cartItemsList');
    const totalPriceEl = document.getElementById('cartTotalPrice');

    if(!badge || !itemsList || !totalPriceEl) return;

    badge.textContent = cart.length;

    if (cart.length === 0) {
        itemsList.innerHTML = `<div class="empty-cart-msg">Votre panier est vide.<br>Sélectionnez vos douceurs depuis le menu.</div>`;
        totalPriceEl.textContent = `0 DH`;
        return;
    }

    let total = 0;
    itemsList.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div class="cart-item-card">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantité : ${item.quantityText}</p>
                </div>
                <div class="cart-item-right">
                    <span class="cart-item-price">${item.price} DH</span>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');

    totalPriceEl.textContent = `${total} DH`;
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function toggleCartDrawer() {
    document.getElementById('cartDrawer').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function showToast() {
    const toast = document.getElementById('toastNotification');
    if(!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Gestion de la modale d'alerte avant WhatsApp
function openConfirmModal() {
    if (cart.length === 0) {
        alert('Votre panier est vide.');
        return;
    }
    document.getElementById('confirmModal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

function proceedToWhatsApp() {
    closeConfirmModal();
    toggleCartDrawer();

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    let message = "Salam 3alaykoum, je souhaite valider ma commande de Halawiyat El Beldi :\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* - Qte: ${item.quantityText} (${item.price} DH)\n`;
    });
    message += `\n*Total Estimé :* *${total} DH*\n\nVeuillez me confirmer la disponibilité et les modalités de livraison.`;

    const phoneNumber = storeData.whatsappNumber;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// Scroll Hide Header
let lastScrollTop = 0;
const header = document.getElementById('mainHeader');

if(header) {
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}
