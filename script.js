// ==========================================
// CONFIGURATION DE LA BOUTIQUE & API LOYVERSE
// ==========================================
const LOYVERSE_API_TOKEN = "METS_ICI_TA_CLE_API_LOYVERSE"; // Remplace par la clé API de ton client
const WHATSAPP_NUMBER = "212600000000"; // Remplace par le numéro WhatsApp du client

let categoriesData = [];
let cart = [];
let activeCategory = null;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchLoyverseData();
    updateCartUI();
});

// Récupération des articles depuis Loyverse Back Office
async function fetchLoyverseData() {
    try {
        // En mode test ou en attendant la clé API, on utilise une structure par défaut
        // Dès que tu as la clé Loyverse, la requête fetch se fera ici :
        /*
        const response = await fetch('https://api.loyverse.com/v1/items', {
            headers: { 'Authorization': `Bearer ${LOYVERSE_API_TOKEN}` }
        });
        const data = await response.json();
        */

        // Données structurées prêtes pour Loyverse et les catégories spécifiques
        categoriesData = [
            {
                id: "sables",
                name: "Les Sables (60 DH)",
                type: "weight", // Utilise le calculateur g / kg
                items: [
                    { id: "s1", name: "Sablé Prestige aux Amandes", desc: "Délicieux sablés fondants au caramel maison.", basePrice: 60, baseUnit: "kg", inStock: true, img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600" },
                    { id: "s2", name: "Sablé Confiture & Noisette", desc: "Pâtisserie fondante chocolat et noisette.", basePrice: 60, baseUnit: "kg", inStock: true, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            {
                id: "cat70",
                name: "Collection Classique (70 DH)",
                type: "weight",
                items: [
                    { id: "c70_1", name: "Ghoriba Bhissa aux Noix", desc: "Biscuits traditionnels aux noix et cannelle.", basePrice: 70, baseUnit: "kg", inStock: true, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            {
                id: "cat75",
                name: "Sélection Miel & Sésame (75 DH)",
                type: "weight",
                items: [
                    { id: "c75_1", name: "Chebakia Miel & Sésame", desc: "Chebakia traditionnelle au miel pur.", basePrice: 75, baseUnit: "kg", inStock: true, img: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            {
                id: "cat80",
                name: "Spécialités Dorées (80 DH)",
                type: "weight",
                items: [
                    { id: "c80_1", name: "Briouates aux Amandes", desc: "Briouates croustillantes aux amandes et miel.", basePrice: 80, baseUnit: "kg", inStock: true, img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            {
                id: "cat85",
                name: "Pâtisserie Fine (85 DH)",
                type: "weight",
                items: [
                    { id: "c85_1", name: "Kaab el Ghazal Pur Amande", desc: "Cornes de gazelle aux amandes et eau de fleur d'oranger.", basePrice: 85, baseUnit: "kg", inStock: true, img: "https://images.unsplash.com/photo-1526084279284-2e9276c9994c?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            {
                id: "cat150",
                name: "Coffrets Royaux (150 DH)",
                type: "weight",
                items: [
                    { id: "c150_1", name: "Coffret Sultan Assortiment", desc: "Coffret de luxe assorti.", basePrice: 150, baseUnit: "kg", inStock: true, img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            {
                id: "plateaux",
                name: "Plateaux",
                type: "fixed_unit", // Quantité simple (1, 2, 3 plateaux...)
                items: [
                    { id: "p1", name: "Plateau Royal Assorti", desc: "Plateau garni de 200 pièces de nos meilleures spécialités.", basePrice: 850, baseUnit: "plateau", inStock: true, img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600" }
                ]
            },
            {
                id: "packs",
                name: "Packs Spéciaux",
                type: "fixed_unit", // Quantité simple (1, 2, 3 packs...)
                items: [
                    { id: "pk1", name: "Pack Spécial Beldi", desc: "5 kgs de sablés + 1kg de Kaab el Ghazal + assortiment complet.", basePrice: 1000, baseUnit: "pack", inStock: true, img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600" }
                ]
            }
        ];

        if (categoriesData.length > 0) {
            activeCategory = categoriesData[0].id;
            renderCategoryTabs();
            renderProducts(activeCategory);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des articles Loyverse :", error);
    }
}

// Affichage du slider des catégories
function renderCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = categoriesData.map(cat => `
        <div class="cat-slider-card ${cat.id === activeCategory ? 'active' : ''}" onclick="switchCategory('${cat.id}')">
            <span>${cat.name}</span>
        </div>
    `).join('');
}

function switchCategory(catId) {
    activeCategory = catId;
    renderCategoryTabs();
    renderProducts(activeCategory);
}

// Affichage des produits selon la catégorie (Poids vs Unité fixe Plateau/Pack)
function renderProducts(catId) {
    const category = categoriesData.find(c => c.id === catId);
    const grid = document.getElementById('productsGrid');
    if (!category || !grid) return;

    grid.innerHTML = category.items.map(product => {
        const isFixedUnit = category.type === 'fixed_unit';

        return `
            <div class="product-card ${!product.inStock ? 'is-sold-out' : ''}">
                <img src="${product.img}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="price-indicator">
                        Prix : <strong>${product.basePrice} DH</strong> ${isFixedUnit ? 'par ' + product.baseUnit : 'par kg'}
                    </div>
                    
                    <div class="calc-box" style="${!product.inStock ? 'opacity: 0.5; pointer-events: none;' : ''}">
                        <span class="calc-label">${isFixedUnit ? 'Nombre souhaité :' : 'Quantité souhaitée :'}</span>
                        <div class="calc-inputs">
                            <input type="number" id="qty-${product.id}" value="1" min="1" step="1" oninput="calculatePrice('${product.id}', ${product.basePrice}, '${product.baseUnit}', '${category.type}')">
                            
                            ${isFixedUnit ? 
                                `<span style="color: var(--gold-light); font-weight: 600; padding: 0.4rem; font-size: 0.85rem;">${product.baseUnit}(s)</span>` : 
                                `<select id="unit-${product.id}" onchange="calculatePrice('${product.id}',${product.basePrice}, '${product.baseUnit}', '${category.type}')">
                                    <option value="g" selected>g</option>
                                    <option value="kg">kg</option>
                                    <option value="pcs">unités</option>
                                </select>`
                            }
                        </div>
                        <div class="conversion-result">
                            <span>Total Estimé :</span>
                            <span class="calculated-price" id="calc-price-${product.id}">--</span>
                        </div>
                    </div>

                    <button class="add-to-cart-btn ${!product.inStock ? 'sold-out-btn' : ''}" 
                        onclick="${product.inStock ? `addToCart('${product.id}', '${product.name}',${product.basePrice}, '${product.baseUnit}', '${category.type}')` : 'return false;'}"
                        ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? '<i class="fa-solid fa-bag-shopping"></i> Ajouter au Panier' : '<i class="fa-solid fa-ban"></i> Épuisé'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    category.items.forEach(product => {
        if(product.inStock) {
            calculatePrice(product.id, product.basePrice, product.baseUnit, category.type);
        }
    });
}

// Calcul dynamique du prix en temps réel
function calculatePrice(productId, basePrice, baseUnit, type) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const priceDisplay = document.getElementById(`calc-price-${productId}`);
    
    if(!qtyInput || !priceDisplay) return;

    let amount = parseFloat(qtyInput.value) || 0;
    let finalPrice = 0;

    if (type === 'fixed_unit') {
        finalPrice = amount * basePrice;
    } else {
        const unitSelect = document.getElementById(`unit-${productId}`);
        let unit = unitSelect ? unitSelect.value : 'g';
        if (unit === 'g') finalPrice = (amount / 1000) * basePrice;
        else if (unit === 'kg') finalPrice = amount * basePrice;
        else if (unit === 'pcs') finalPrice = (amount * (basePrice / 20));
    }

    priceDisplay.textContent = `${Math.round(finalPrice)} DH`;
}

// Ajouter au panier
function addToCart(productId, productName, basePrice, baseUnit, type) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    let amount = parseFloat(qtyInput.value);

    if (!amount || amount <= 0) {
        alert('Veuillez entrer une quantité valide.');
        return;
    }

    let calculatedPrice = 0;
    let quantityText = '';

    if (type === 'fixed_unit') {
        calculatedPrice = amount * basePrice;
        quantityText = `${amount} ${baseUnit}(s)`;
    } else {
        const unitSelect = document.getElementById(`unit-${productId}`);
        let unit = unitSelect ? unitSelect.value : 'g';
        if (unit === 'g') calculatedPrice = (amount / 1000) * basePrice;
        else if (unit === 'kg') calculatedPrice = amount * basePrice;
        else if (unit === 'pcs') calculatedPrice = (amount * (basePrice / 20));
        quantityText = `${amount}${unit}`;
    }

    const cartItem = {
        id: `${productId}-${Date.now()}`,
        name: productName,
        quantityText: quantityText,
        price: Math.round(calculatedPrice)
    };

    cart.push(cartItem);
    updateCartUI();
    showToast();
}

// Mise à jour de l'interface du panier
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

// Gestion de la modale WhatsApp
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

// Validation finale et redirection vers WhatsApp corrigée et fonctionnelle
function proceedToWhatsApp() {
    closeConfirmModal();
    toggleCartDrawer();

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    let message = "Salam 3alaykoum, je souhaite valider ma commande de Halawiyat El Beldi :\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* - Qte: ${item.quantityText} (${item.price} DH)\n`;
    });
    message += `\n*Total Estimé :* *${total} DH*\n\nVeuillez me confirmer la disponibilité et les modalités de livraison.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Redirection directe vers WhatsApp
    window.location.href = whatsappUrl;
}

// Effet de masquage du header au défilement
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
