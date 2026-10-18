// ==========================================
// CONFIGURATION DE LA BOUTIQUE - HALAWIYAT EL BELDI
// ==========================================
// Ce fichier permet de gérer facilement :
// - Les prix (basePrice)
// - Les stocks : inStock: true (Disponible) ou false (Sold Out / Épuisé)
// - D'ajouter de nouveaux produits ou de nouvelles catégories
// ==========================================

const storeData = {
    whatsappNumber: "212600000000", // Mettez le numéro WhatsApp du client ici (avec indicatif 212, sans le +)
    
    categories: [
        {
            id: "sables",
            name: "Les Sables (60 DH)",
            items: [
                { 
                    id: "s1", 
                    name: "Sablé Prestige aux Amandes", 
                    desc: "Delicate buttery cookies filled with homemade caramel and roasted almonds.", 
                    basePrice: 60, 
                    baseUnit: "kg", 
                    inStock: true, // Mettez false si épuisé
                    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "s2", 
                    name: "Sablé Confiture & Noisette", 
                    desc: "Melt-in-your-mouth pastry dipped in rich chocolate and hazelnut praline.", 
                    basePrice: 60, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        },
        {
            id: "cat70",
            name: "Collection Classique (70 DH)",
            items: [
                { 
                    id: "c70_1", 
                    name: "Ghoriba Bhissa aux Noix", 
                    desc: "Traditional crackly shortbread cookies infused with toasted walnuts and cinnamon.", 
                    basePrice: 70, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "c70_2", 
                    name: "Feqkas Traditionnel Beldi", 
                    desc: "Moroccan twice-baked biscotti loaded with premium almonds and raisins.", 
                    basePrice: 70, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1557308536-ee4314e14ecb?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        },
        {
            id: "cat75",
            name: "Sélection Miel & Sésame (75 DH)",
            items: [
                { 
                    id: "c75_1", 
                    name: "Chebakia Miel & Sésame", 
                    desc: "Traditional flower-shaped pastry fried to perfection, dipped in pure honey and toasted sesame.", 
                    basePrice: 75, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fi=crop&q=80&w=600" 
                },
                { 
                    id: "c75_2", 
                    name: "Mhancha Miel & Cannelle", 
                    desc: "Delightful golden pastry rolls coated in rich natural honey and cinnamon.", 
                    basePrice: 75, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-158731416885-3236d6710814?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        },
        {
            id: "cat80",
            name: "Spécialités Dorées (80 DH)",
            items: [
                { 
                    id: "c80_1", 
                    name: "Briouates aux Amandes & Miel", 
                    desc: "Crispy triangular pastry parcels packed with crushed almonds and drizzled with honey.", 
                    basePrice: 80, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "c80_2", 
                    name: "Mchawek aux Amandes", 
                    desc: "Mouthwatering soft almond cookies decorated entirely with crisp split almonds.", 
                    basePrice: 80, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1599785209707-a456fc1337cc?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        },
        {
            id: "cat85",
            name: "Pâtisserie Fine (85 DH)",
            items: [
                { 
                    id: "c85_1", 
                    name: "Kaab el Ghazal Pur Amande", 
                    desc: "Hand-rolled pastry stuffed with exquisite pure almond paste infused with orange blossom water.", 
                    basePrice: 85, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1526084279284-2e9276c9994c?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "c85_2", 
                    name: "Corbeille Royale aux Noix de Cajou", 
                    desc: "Rich artisanal creation filled with premium cashew paste and roasted pistachio dust.", 
                    basePrice: 85, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        },
        {
            id: "cat150",
            name: "Coffrets Royaux (150 DH)",
            items: [
                { 
                    id: "c150_1", 
                    name: "Coffret Sultan (Assortiment 1kg)", 
                    desc: "A luxurious gold-accented box containing a hand-picked elite assortment of royal pastries.", 
                    basePrice: 150, 
                    baseUnit: "box", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "c150_2", 
                    name: "Coffret Impérial Prestige", 
                    desc: "The ultimate luxury gift box featuring exclusive almond masterpieces in sophisticated packaging.", 
                    basePrice: 150, 
                    baseUnit: "box", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        }
    ]
};