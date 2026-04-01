# Supabase Setup Checklist

## What You Need from Supabase

### 1. Project URL
- Found in: Settings → API → Project URL
- Format: `https://xxxxxxxxxxxxxx.supabase.co`

### 2. Anon Key
- Found in: Settings → API → Project API keys → `anon` key
- Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Storage Bucket
- Create a bucket named: `products`
- Set as **Public**

---

## SQL Code to Run in Supabase SQL Editor

### 1. Create Products Table
```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image TEXT NOT NULL,
    badge TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Allow Public Access (Run all 4)
```sql
-- Allow public read
CREATE POLICY "Allow public read" ON products
    FOR SELECT USING (true);

-- Allow public insert
CREATE POLICY "Allow public insert" ON products
    FOR INSERT WITH CHECK (true);

-- Allow public update
CREATE POLICY "Allow public update" ON products
    FOR UPDATE USING (true);

-- Allow public delete
CREATE POLICY "Allow public delete" ON products
    FOR DELETE USING (true);
```

### 3. Add Sample Products (Optional)
```sql
INSERT INTO products (name, category, price, image, badge) VALUES
('Ocean Breeze', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Ocean+Breeze', 'Fresh'),
('Kaly', 'perfume', 10500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Kaly', 'New'),
('Kamrah 30ml', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Kamrah', ''),
('Bakarrat 30ml', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Bakarrat', 'Bestseller'),
('My Way', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=My+Way', 'Light'),
('Ophylia', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Ophylia', 'Sweet'),
('Eclaire X Sugar Pink', 'perfume', 9000, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Eclaire', 'New'),
('Avanti', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Avanti', ''),
('Asad X Avantos', 'perfume', 9000, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Asad+X', 'Travel'),
('Berries Weekend', 'perfume', 9000, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Berries', 'Woody'),
('Yara', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Yara', 'Cool'),
('Asad', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Asad', '');
```

### 4. Storage Setup (Go to Storage → New Bucket)
```sql
-- In Storage > Policies, create these policies for 'products' bucket:

-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
    FOR SELECT USING (bucket_id = 'products');

-- Allow public upload
CREATE POLICY "Public upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'products');

-- Allow public delete  
CREATE POLICY "Public delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'products');
```

---

## After Setup
1. Update `js/config.js` with your URL and key (if different)
2. Make sure your Supabase project is **NOT PAUSED**
3. Check your project is active in Supabase dashboard