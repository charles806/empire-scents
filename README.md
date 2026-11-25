# AkuSparkle - Thoughtful Haircare

A single-page marketing + e-commerce website for **AkuSparkle**, a thoughtful haircare brand. Built with vanilla HTML, CSS, and JavaScript. No build tools — open `index.html` and it just works.

## Features

- **Single-page homepage**: Hero, brand statement, about, shop, hair-concerns/consultations, how it works, product education, testimonials, founder story, haircare nuggets, FAQ, contact and footer
- **Product Catalog**: Shop page with category filters (Shampoo, Conditioner, Hair & Scalp Oil, Leave-in, Treatments, Styling)
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout**: Payment via bank transfer with WhatsApp receipt notification
- **Admin Dashboard**: Add, edit, and delete products with image upload
- **Dark/Light Theme**: Toggle in the mobile menu
- **Responsive Design**: Works on all screen sizes (XL, LG, MD, SM, XS)

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla, no build step)
- Products stored in `localStorage` (base64 images) — works fully offline
- Supabase config kept in `js/config.js` with an automatic graceful fallback to local storage
- BoxIcons for icons, Google Fonts (Fraunces, Inter)

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home - hero + all 13 site sections |
| `products.html` | Product listing with category filters |
| `cart.html` | Shopping cart with quantity management |
| `payment.html` | Checkout with bank transfer details |
| `contact.html` | Contact form with WhatsApp integration |
| `about.html` | Brand story (founder: Enyinna Akudo Treasure) |
| `admin.html` | Admin dashboard (password protected) |

## Project Structure

```
AkuSparkle/
├── index.html          # Single-page homepage
├── products.html       # Products page
├── cart.html           # Shopping cart
├── payment.html        # Checkout/payment
├── admin.html          # Admin dashboard
├── contact.html        # Contact page
├── about.html          # Our Story page
├── css/
│   └── style.css       # Design system + all styles
├── js/
│   ├── config.js       # Products, categories, payment details
│   ├── main.js         # Main application logic
│   ├── home.js         # FAQ accordion + logo swap
│   └── security.js     # Admin authentication + CSP
└── images/             # Product, hero and brand imagery
```

## Images to Add

Drop your files into `images/` — the site is already wired to these paths with graceful fallbacks, so nothing breaks before they exist:

```
images/akusparkle-logo.png   # Logo (auto-replaces the text wordmark)
images/hero-product.png      # Hero product shot (clean, premium, natural)
images/about.jpg             # Brand introduction image
images/founder.jpg           # Founder portrait (Enyinna Akudo Treasure)
images/products/*.jpg        # Product shots (see js/config.js for filenames)
```

Each page hero/about section falls back to `images/placeholder.svg` until a real photo is provided.

## Admin Access

- URL: `admin.html`
- Password: `AkuSpakle123!` (set in `js/security.js`)

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
- **BoxIcons** - Icon library
- **Google Fonts** - Fraunces, Inter

---

Built with ❤️ for AkuSparkle