const SUPABASE_URL = 'https://gnmdtbvjtdykcfqgtexm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubWR0YnZqdGR5a2NmcWd0ZXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjQzODAsImV4cCI6MjA4OTM0MDM4MH0.zV1-SjYtCwLIsDQdLY5BH6oxbnPZjfntelvlXAGQ4lk';

let supabaseClient;
let supabaseAvailable = false;

async function initSupabase() {
    if (supabaseClient) return supabaseClient;
    
    if (typeof supabase !== 'undefined') {
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                auth: { persistSession: false }
            });
            await supabaseClient.from('products').select('id').limit(1);
            supabaseAvailable = true;
            return supabaseClient;
        } catch (e) {
            console.warn('Supabase not available, using local storage');
            supabaseAvailable = false;
            return null;
        }
    }
    console.warn('Supabase SDK not loaded - using local storage fallback');
    return null;
}

const ImageService = {
    async uploadImage(file) {
        if (!file || !file.type.startsWith('image/')) {
            return null;
        }
        return await this.convertToBase64(file);
    },

    async convertToBase64(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    },

    async deleteImage(imageUrl) {
        return true;
    }
};

const ProductService = {
    async getAll() {
        return getLocalProducts();
    },

    async getByCategory(category) {
        const products = getLocalProducts();
        return category === 'all' ? products : products.filter(p => p.category === category);
    },

    async getFeatured(limit = 4) {
        const products = getLocalProducts();
        const featured = products.filter(p => ['Bestseller', 'Premium', 'New'].includes(p.badge));
        return featured.slice(0, limit);
    },

    async create(product) {
        const products = getLocalProducts();
        const newProduct = {
            ...Security.sanitizeProduct(product),
            id: Date.now(),
            created_at: new Date().toISOString()
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        return newProduct;
    },

    async update(id, updates) {
        const products = getLocalProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...Security.sanitizeProduct(updates) };
            localStorage.setItem('products', JSON.stringify(products));
            return products[index];
        }
        return null;
    },

    async delete(id) {
        const products = getLocalProducts();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(filtered));
        return true;
    },

    async getCount() {
        const products = await this.getAll();
        return products.length;
    }
};

function getLocalProducts() {
    const stored = localStorage.getItem('products');
    if (stored) {
        return JSON.parse(stored);
    }
    return DEFAULT_PRODUCTS;
}

const DEFAULT_PRODUCTS = [
    {
        id: 5,
        name: "Strengthening Shampoo",
        category: "shampoo",
        price: 8000,
        image: "images/products/shampoo.jpg",
        badge: "Bestseller"
    },
    {
        id: 6,
        name: "Deep Repair Conditioner",
        category: "conditioner",
        price: 8500,
        image: "images/products/conditioner.jpg",
        badge: ""
    },
    {
        id: 7,
        name: "Hair & Scalp Oil",
        category: "hair-oil",
        price: 9000,
        image: "images/products/hair-oil.jpg",
        badge: "Bestseller"
    },
    {
        id: 8,
        name: "Leave-in Repair Cream",
        category: "leave-in",
        price: 7500,
        image: "images/products/leave-in.jpg",
        badge: "New"
    },
    {
        id: 9,
        name: "Moisture Restore Mask",
        category: "treatment",
        price: 9500,
        image: "images/products/mask.jpg",
        badge: ""
    },
    {
        id: 10,
        name: "Gentle Clarifying Rinse",
        category: "shampoo",
        price: 6500,
        image: "images/products/clarifying.jpg",
        badge: "New"
    },
    {
        id: 11,
        name: "Edges & Hairline Butter",
        category: "styling",
        price: 7000,
        image: "images/products/edges-butter.jpg",
        badge: ""
    },
    {
        id: 12,
        name: "Satin Bonding Serum",
        category: "leave-in",
        price: 8500,
        image: "images/products/serum.jpg",
        badge: "Bestseller"
    },
    {
        id: 13,
        name: "Scalp Balance Scrub",
        category: "treatment",
        price: 8000,
        image: "images/products/scalp-scrub.jpg",
        badge: "New"
    },
    {
        id: 14,
        name: "Everyday Soft Hold Gel",
        category: "styling",
        price: 6500,
        image: "images/products/soft-gel.jpg",
        badge: ""
    }
];

const CATEGORIES = [
    { name: "Shampoo", slug: "shampoo", image: "images/products/shampoo.jpg" },
    { name: "Conditioner", slug: "conditioner", image: "images/products/conditioner.jpg" },
    { name: "Hair & Scalp Oil", slug: "hair-oil", image: "images/products/hair-oil.jpg" },
    { name: "Leave-in", slug: "leave-in", image: "images/products/leave-in.jpg" },
    { name: "Treatments", slug: "treatment", image: "images/products/mask.jpg" },
    { name: "Styling", slug: "styling", image: "images/products/soft-gel.jpg" }
];

const PAYMENT_DETAILS = {
    accountNumber: "9073824064",
    bank: "PalmPay",
    accountName: "Egwim Gift Rosemary"
};
