const storeData = {
    whatsappNumber: "212600000000", // Mets le vrai numéro WhatsApp de ton client ici
    
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
                    baseUnit: "kg", 
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
                    name: "Plateau Royal Assorti (200 Unités)", 
                    desc: "Magnifique plateau garni de 200 pièces de nos meilleures spécialités aux amandes et miel.", 
                    basePrice: 850, 
                    baseUnit: "plateau", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600" 
                },
                { 
                    id: "p2", 
                    name: "Plateau Prestige Fêtes (100 Unités)", 
                    desc: "Assortiment raffiné de 100 pièces variées, idéal pour vos réceptions et fêtes.", 
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
                    name: "Pack Célébration Impérial", 
                    desc: "Pack complet incluant coffret de luxe, assortiment de sablés et douceurs royales.", 
                    basePrice: 1000, 
                    baseUnit: "pack", 
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
                    desc: "Biscuits traditionnels aux noix et cannelle.", 
                    basePrice: 70, 
                    baseUnit: "kg", 
                    inStock: true, 
                    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" 
                }
            ]
        }
    ]
};
