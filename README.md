# Empier Scents - Premium Perfume E-Commerce Website

A modern, elegant, and fully functional e-commerce website for **Empier Scents**, a luxury perfume brand. Built with pure HTML, CSS, and JavaScript with smooth animations, premium design, and complete shopping cart functionality.

## 🎨 Features

### Design & UI
- **Premium Luxury Design** - Elegant blue color scheme with sophisticated typography
- **Smooth Animations** - Fade-in effects, hover transitions, and micro-interactions
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Modern Layout** - Clean, minimalist design with attention to detail
- **Custom Fonts** - Playfair Display, Cormorant Garamond, and Montserrat

### Pages
1. **Home Page** - Hero slider, about preview, categories, featured products
2. **About Page** - Brand story, values, product offerings
3. **Products Page** - Category filtering, product cards with add to cart
4. **Shopping Cart** - View cart, update quantities, remove items
5. **Payment Page** - Bank transfer details, order summary, WhatsApp receipt
6. **Contact Page** - Contact information, animated contact form

### Functionality
- ✅ Product category filtering (All, Oil Perfume, Body Spray, Body Mist, Roll-On, Perfumes)
- ✅ Add to cart functionality
- ✅ Cart management (increase/decrease quantity, remove items)
- ✅ localStorage for persistent cart data
- ✅ Real-time cart count in header
- ✅ Automatic total calculation
- ✅ WhatsApp integration for sending receipts
- ✅ Mobile-responsive navigation menu
- ✅ Smooth scroll animations
- ✅ Hero image slider with auto-advance

## 📁 Project Structure

```
empier-scents/
│
├── index.html           # Home page
├── about.html           # About page
├── products.html        # Products page with filtering
├── cart.html            # Shopping cart page
├── payment.html         # Payment page
├── contact.html         # Contact page
│
├── css/
│   └── style.css        # Main stylesheet with premium design
│
├── js/
│   └── main.js          # JavaScript functionality
│
├── images/              # Product and website images (see below)
│   ├── hero-1.jpg       # Hero slider image 1
│   ├── hero-2.jpg       # Hero slider image 2
│   ├── hero-3.jpg       # Hero slider image 3
│   ├── about-preview.jpg
│   ├── about-story.jpg
│   ├── category-oil.jpg
│   ├── category-spray.jpg
│   ├── category-mist.jpg
│   ├── category-rollon.jpg
│   ├── category-perfume.jpg
│   ├── oil-perfume-1.jpg to oil-perfume-4.jpg
│   ├── body-spray-1.jpg to body-spray-4.jpg
│   ├── body-mist-1.jpg to body-mist-4.jpg
│   ├── roll-on-1.jpg to roll-on-4.jpg
│   ├── perfume-1.jpg to perfume-4.jpg
│   └── placeholder.jpg  # Fallback image
│
└── README.md            # This file
```

## 🖼️ Images Required

To complete the website, add the following images to the `images/` folder:

### Hero Slider (3 images)
- `hero-1.jpg` - Main hero banner
- `hero-2.jpg` - Second hero banner
- `hero-3.jpg` - Third hero banner

### About Section (2 images)
- `about-preview.jpg` - For home page about section
- `about-story.jpg` - For about page

### Category Images (5 images)
- `category-oil.jpg` - Oil perfume category
- `category-spray.jpg` - Body spray category
- `category-mist.jpg` - Body mist category
- `category-rollon.jpg` - Roll-on category
- `category-perfume.jpg` - Perfume category

### Product Images (20 images total)
**Oil Perfumes (4 images):**
- `oil-perfume-1.jpg` - Midnight Oud
- `oil-perfume-2.jpg` - Royal Amber
- `oil-perfume-3.jpg` - Silk Musk
- `oil-perfume-4.jpg` - Desert Rose

**Body Sprays (4 images):**
- `body-spray-1.jpg` - Ocean Breeze
- `body-spray-2.jpg` - Citrus Burst
- `body-spray-3.jpg` - Tropical Paradise
- `body-spray-4.jpg` - Lavender Dreams

**Body Mists (4 images):**
- `body-mist-1.jpg` - Cherry Blossom
- `body-mist-2.jpg` - Vanilla Cloud
- `body-mist-3.jpg` - Peach Delight
- `body-mist-4.jpg` - Rose Garden

**Roll-Ons (4 images):**
- `roll-on-1.jpg` - Jasmine Touch
- `roll-on-2.jpg` - Sandalwood Essence
- `roll-on-3.jpg` - Mint Fresh
- `roll-on-4.jpg` - Lily White

**Perfumes (4 images):**
- `perfume-1.jpg` - Elegance Noir
- `perfume-2.jpg` - Azure Dream
- `perfume-3.jpg` - Golden Hour
- `perfume-4.jpg` - Velvet Rose

### Image Specifications
- **Format:** JPG or PNG
- **Hero images:** 1920x1080px (landscape)
- **Category images:** 800x800px (square)
- **Product images:** 600x600px (square)
- **About images:** 800x600px (landscape)

## 🚀 Getting Started

1. **Extract the files** to your desired location
2. **Add images** to the `images/` folder (see list above)
3. **Update bank details** in `payment.html` (Account Name, Number, Bank)
4. **Update contact information** if needed in all pages
5. **Open `index.html`** in your web browser

## 📝 Customization

### Change Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-blue: #1e3a8a;
    --primary-blue-light: #3b82f6;
    /* ... other colors */
}
```

### Update Products
Edit the products array in `js/main.js`:
```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        category: "category-slug",
        price: 8500,
        image: "images/product.jpg",
        badge: "New"
    },
    // ... more products
];
```

### Update Bank Details
Edit the bank details section in `payment.html`:
```html
<div class="bank-detail-item">
    <span class="bank-detail-label">Account Name:</span>
    <span class="bank-detail-value">Your Account Name</span>
</div>
```

### Update Contact Information
Update contact details in all pages:
- WhatsApp: 07040062388
- Phone: 09073824064
- Email: egwingift@gmail.com
- Location: Rivers State, Nigeria

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, flexbox, grid
- **JavaScript (ES6)** - Modern JavaScript features
- **Boxicons** - Icon library
- **Google Fonts** - Playfair Display, Cormorant Garamond, Montserrat
- **localStorage** - For cart persistence

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Features Breakdown

### Shopping Cart
- Stores data in localStorage (persists across sessions)
- Real-time cart count display
- Add/remove items
- Increase/decrease quantities
- Automatic price calculations
- Empty cart handling

### Product Filtering
- Filter by category
- Smooth transitions
- Dynamic product loading
- Category count display

### WhatsApp Integration
- Auto-generates receipt message
- Includes all order details
- Opens WhatsApp with pre-filled message
- Works on mobile and desktop

### Animations
- Fade-in on scroll
- Hover effects
- Smooth page transitions
- Loading animations
- Staggered element reveals

## 📞 Support & Contact

For support or inquiries:
- **WhatsApp:** 07040062388
- **Phone:** 09073824064
- **Email:** egwingift@gmail.com

## 📄 License

This project is created for Empier Scents. All rights reserved.

## 🎨 Design Credits

- Custom design with premium luxury aesthetic
- Blue gradient color scheme
- Sophisticated typography pairing
- Modern minimalist approach

---

**Built with ❤️ for Empier Scents**

*Last Updated: February 2026*
