const SUPABASE_URL = 'https://gnmdtbvjtdykcfqgtexm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubWR0YnZqdGR5a2NmcWd0ZXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjQzODAsImV4cCI6MjA4OTM0MDM4MH0.zV1-SjYtCwLIsDQdLY5BH6oxbnPZjfntelvlXAGQ4lk';
const SUPABASE_STORAGE_URL = 'https://gnmdtbvjtdykcfqgtexm.supabase.co/storage/v1';

let supabaseClient;

async function initSupabase() {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return supabaseClient;
    }
    console.warn('Supabase SDK not loaded - using local storage fallback');
    return null;
}

const ImageService = {
    async uploadImage(file) {
        if (!file || !file.type.startsWith('image/')) {
            return null;
        }

        const client = await initSupabase();
        if (!client) {
            return null;
        }

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        
        try {
            const { data, error } = await client
                .storage
                .from('products')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type
                });

            if (error) {
                console.error('Upload error:', error);
                return null;
            }

            const { data: urlData } = client
                .storage
                .from('products')
                .getPublicUrl(fileName);

            return urlData.publicUrl;
        } catch (err) {
            console.error('Image upload failed:', err);
            return null;
        }
    },

    async deleteImage(imageUrl) {
        if (!imageUrl || !imageUrl.includes('supabase')) {
            return true;
        }

        const client = await initSupabase();
        if (!client) return true;

        try {
            const fileName = imageUrl.split('/storage/v1/object/public/products/')[1];
            if (fileName) {
                await client.storage.from('products').remove([fileName]);
            }
            return true;
        } catch (err) {
            console.error('Image delete failed:', err);
            return true;
        }
    }
};

const ProductService = {
    async getAll() {
        const client = await initSupabase();
        if (client) {
            const { data, error } = await client
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data;
        }
        return getLocalProducts();
    },

    async getByCategory(category) {
        const client = await initSupabase();
        if (client) {
            const { data, error } = await client
                .from('products')
                .select('*')
                .eq('category', category)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data;
        }
        
        const products = getLocalProducts();
        return category === 'all' ? products : products.filter(p => p.category === category);
    },

    async getFeatured(limit = 4) {
        const client = await initSupabase();
        if (client) {
            const { data, error } = await client
                .from('products')
                .select('*')
                .in('badge', ['Bestseller', 'Premium', 'New'])
                .limit(limit);
            
            if (error) throw error;
            return data;
        }
        
        const products = getLocalProducts();
        const featured = products.filter(p => ['Bestseller', 'Premium', 'New'].includes(p.badge));
        return featured.slice(0, limit);
    },

    async create(product) {
        const client = await initSupabase();
        const sanitizedProduct = Security.sanitizeProduct(product);
        
        if (client) {
            const { data, error } = await client
                .from('products')
                .insert([sanitizedProduct])
                .select();
            
            if (error) throw error;
            return data[0];
        }
        
        const products = getLocalProducts();
        const newProduct = {
            ...sanitizedProduct,
            id: Date.now(),
            created_at: new Date().toISOString()
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        return newProduct;
    },

    async update(id, updates) {
        const client = await initSupabase();
        const sanitizedUpdates = Security.sanitizeProduct(updates);
        
        if (client) {
            const { data, error } = await client
                .from('products')
                .update(sanitizedUpdates)
                .eq('id', id)
                .select();
            
            if (error) throw error;
            return data[0];
        }
        
        const products = getLocalProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...sanitizedUpdates };
            localStorage.setItem('products', JSON.stringify(products));
            return products[index];
        }
        return null;
    },

    async delete(id) {
        const client = await initSupabase();
        
        if (client) {
            const { error } = await client
                .from('products')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        }
        
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
        name: "Ocean Breeze",
        category: "perfume",
        price: 4500,
        image: "images/body-spray-1.jpg",
        badge: "Fresh"
    },
    {
        id: 6,
        name: "Kaly",
        category: "perfume",
        price: 10500,
        image: "images/body-spray-2.jpg",
        badge: "New"
    },
    {
        id: 7,
        name: "Kamrah 30ml",
        category: "perfume",
        price: 4500,
        image: "images/body-spray-3.jpg",
        badge: ""
    },
    {
        id: 8,
        name: "Bakarrat 30ml",
        category: "perfume",
        price: 4500,
        image: "images/image.png",
        badge: "Bestseller"
    },
    {
        id: 9,
        name: "My Way",
        category: "perfume",
        price: 4500,
        image: "images/image copy.png",
        badge: "Light"
    },
    {
        id: 10,
        name: "Ophylia",
        category: "perfume",
        price: 4500,
        image: "images/opheli.png",
        badge: "Sweet"
    },
    {
        id: 11,
        name: "Eclaire X Sugar Pink",
        category: "perfume",
        price: 9000,
        image: "images/image copy 2.png",
        badge: "New"
    },
    {
        id: 12,
        name: "Avanti",
        category: "perfume",
        price: 4500,
        image: "images/image copy 3.png",
        badge: ""
    },
    {
        id: 13,
        name: "Asad X Avantos",
        category: "perfume",
        price: 9000,
        image: "images/image copy 4.png",
        badge: "Travel"
    },
    {
        id: 14,
        name: "Berries Weekend X Now men",
        category: "perfume",
        price: 9000,
        image: "images/image copy 5.png",
        badge: "Woody"
    },
    {
        id: 15,
        name: "Yara",
        category: "perfume",
        price: 4500,
        image: "images/image copy 6.png",
        badge: "Cool"
    },
    {
        id: 16,
        name: "Asad",
        category: "perfume",
        price: 4500,
        image: "images/image copy 7.png",
        badge: ""
    }
];

const CATEGORIES = [
    { name: "Oil Perfume", slug: "oil-perfume", image: "images/category-oil.jpg" },
    { name: "Body Spray", slug: "body-spray", image: "images/category-spray.jpg" },
    { name: "Body Mist", slug: "body-mist", image: "images/category-mist.jpg" },
    { name: "Roll-On", slug: "roll-on", image: "images/category-rollon.jpg" },
    { name: "Perfumes", slug: "perfume", image: "images/category-perfume.jpg" }
];

const PAYMENT_DETAILS = {
    accountNumber: "9073824064",
    bank: "PalmPay",
    accountName: "Egwim Gift Rosemary"
};
