# Supabase Configuration

1. Create a project at https://supabase.com
2. Go to Project Settings > API
3. Copy your Project URL and anon/public key

# Update config.js

Replace these values in js/config.js:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

# Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Create products table
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image TEXT NOT NULL,
    badge TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (optional)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON products
    FOR SELECT USING (true);

-- Allow authenticated write access
CREATE POLICY "Allow authenticated insert" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON products
    FOR DELETE USING (auth.role() = 'authenticated');
```

# Admin Password

The default admin password is: `EmiperAdmin2026!`

Change this in js/security.js if needed.
