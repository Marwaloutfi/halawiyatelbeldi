// ==========================================
// CONFIGURATION DE LA BOUTIQUE - HALAWIYAT EL BELDI
// ==========================================

const storeData = {
    whatsappNumber: "212600000000", // Remplace par le numéro WhatsApp de ton client (avec l'indicatif 212, sans le +)
    
    categories: [
        {
            id: "sables",
            name: "Les Sables (60 DH)",
            items: [
                { 
                    id: "s1", 
                    name: "Sablé Prestige aux Amandes", 
                    desc: "Délicieux sablés fondants au caramel maison et amandes torréfiées.", 
                    basePrice: 60, 
                    baseUnit: "kg", // Utilise le convertisseur g / kg
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "s2", 
                    name: "Sablé Confiture & Noisette", 
                    desc: "Pâtisserie fondante trempée dans un riche chocolat et praliné noisette.", 
                    basePrice: 60, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        },
        {
            id: "plateaux",
            name: "Plateaux de Pâtisseries",
            items: [
                { 
                    id: "p1", 
                    name: "Plateau Royal Assorti", 
                    desc: "Magnifique plateau garni de spécialités aux amandes et au miel pur.", 
                    basePrice: 250, 
                    baseUnit: "plateau", // Quantité simple (1, 2, 3...) sans grammes/kilos
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "p2", 
                    name: "Plateau Prestige Fêtes", 
                    desc: "Assortiment raffiné de pièces variées, idéal pour vos réceptions.", 
                    basePrice: 450, 
                    baseUnit: "plateau", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1599785209707-a456fc1337cc?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        },
        {
            id: "packs",
            name: "Packs Spéciaux",
            items: [
                { 
                    id: "pk1", 
                    name: "Pack Spécial Beldi", 
                    desc: "5 kgs de sablés + 1kg de Kaab el Ghazal + assortiment royal complet.", 
                    basePrice: 1000, 
                    baseUnit: "pack", // Quantité simple (1, 2, 3...)
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600" 
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
                    desc: "Biscuits traditionnels craquelés aux noix et cannelle.", 
                    basePrice: 70, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        }
    ]
};
