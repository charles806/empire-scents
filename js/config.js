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
        id: 1,
        name: "Magic Mix - Dark Currant",
        category: "magic-mix",
        price: 9500,
        image: "images/placeholder.svg",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Magic Mix - Exotic Mix",
        category: "magic-mix",
        price: 9500,
        image: "images/placeholder.svg",
        badge: "New"
    },
    {
        id: 3,
        name: "Hair Growth Oil",
        category: "hair-oil",
        price: 8500,
        image: "images/placeholder.svg",
        badge: "Bestseller"
    },
    {
        id: 4,
        name: "Scalp Cleanser",
        category: "scalp-care",
        price: 7500,
        image: "images/placeholder.svg",
        badge: ""
    },
    {
        id: 5,
        name: "Beard Oil for Men",
        category: "beard-care",
        price: 7000,
        image: "images/placeholder.svg",
        badge: "New"
    }
];

const CATEGORIES = [
    { name: "Magic Mix", slug: "magic-mix", image: "images/placeholder.svg" },
    { name: "Hair Growth Oil", slug: "hair-oil", image: "images/placeholder.svg" },
    { name: "Scalp Cleanser", slug: "scalp-care", image: "images/placeholder.svg" },
    { name: "Beard Oil for Men", slug: "beard-care", image: "images/placeholder.svg" }
];

const PAYMENT_DETAILS = {
    accountNumber: "9073824064",
    bank: "PalmPay",
    accountName: "Egwim Gift Rosemary"
};
