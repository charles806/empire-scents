# Emiper Scents - Premium Fragrance E-commerce

A modern e-commerce website for premium fragrances built with vanilla HTML, CSS, and JavaScript. Uses Supabase for backend services including database and image storage.

## Features

- **Product Catalog**: Browse fragrances by category (Oil Perfume, Body Spray, Body Mist, Roll-On, Perfume)
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout**: Payment via bank transfer with WhatsApp notification
- **Admin Dashboard**: Add, edit, and delete products with image upload to Supabase
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on all screen sizes (XL, LG, MD, SM, XS)
- **CRUD Operations**: Full Create, Read, Update, Delete for products

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Supabase (Database + Storage)
- BoxIcons for icons

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/charles806/empire-scents.git
cd empire-scents
```

### 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the following:

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

-- Allow public access for all operations
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON products FOR DELETE USING (true);
```

### 3. Storage Setup (for Images)

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named `products`
3. Make it **Public** bucket
4. Add policy to allow public access:

```sql
-- Run in SQL Editor to allow public read access to storage
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'products');
```

### 4. Update Config

Edit `js/config.js` with your Supabase credentials:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### 5. Admin Access

- URL: `admin.html`
- Password: `EmiperAdmin2026!`

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home - Hero slider, categories, featured products |
| `products.html` | Product listing with category filters |
| `cart.html` | Shopping cart with quantity management |
| `payment.html` | Checkout with bank transfer details |
| `admin.html` | Admin dashboard (password protected) |
| `contact.html` | Contact form with WhatsApp integration |
| `about.html` | Brand story and information |

## Project Structure

```
Emiper Scents/
├── index.html          # Home page
├── products.html       # Products page
├── cart.html           # Shopping cart
├── payment.html        # Checkout/payment
├── admin.html          # Admin dashboard
├── contact.html        # Contact page
├── about.html          # About page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── config.js       # Supabase config & product service
│   ├── main.js         # Main application logic
│   └── security.js     # Admin authentication
└── images/             # Local images (fallback)
```

## Image Handling

When adding products in admin:
1. Click the image upload area
2. Select an image file (JPG, PNG, WebP)
3. Image is uploaded to Supabase storage
4. Public URL is saved to database

You can also enter an image URL directly if you have hosted images elsewhere.

## Default Products (SQL)

Run this in Supabase SQL Editor to add sample products:

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
('Berries Weekend X Now Men', 'perfume', 9000, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Berries', 'Woody'),
('Yara', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Yara', 'Cool'),
('Asad', 'perfume', 4500, 'https://placehold.co/400x400/1e3a8a/ffffff?text=Asad', '');
```

## Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| XS | < 640px | Mobile - card layout |
| SM | 640-767px | Large mobile |
| MD | 768-1023px | Tablet |
| LG | 1024-1279px | Small desktop |
| XL | ≥ 1280px | Large desktop |

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, flexbox, grid
- **JavaScript ES6** - Modern JavaScript features
- **Supabase** - Backend (Database + Storage)
- **BoxIcons** - Icon library
- **Google Fonts** - Playfair Display, Cormorant Garamond, Montserrat

## License

MIT

---

Built with ❤️ for Emiper Scents