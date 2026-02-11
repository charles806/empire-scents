// Product Data
const products = [
    // Oil Perfumes
    {
        id: 1,
        name: "Midnight Oud",
        category: "oil-perfume",
        price: 8500,
        image: "images/oil-perfume-1.jpg",
        badge: "Premium"
    },
    {
        id: 2,
        name: "Royal Amber",
        category: "oil-perfume",
        price: 7500,
        image: "images/oil-perfume-2.jpg",
        badge: "New"
    },
    {
        id: 3,
        name: "Silk Musk",
        category: "oil-perfume",
        price: 9000,
        image: "images/oil-perfume-3.jpg",
        badge: "Bestseller"
    },
    {
        id: 4,
        name: "Desert Rose",
        category: "oil-perfume",
        price: 8000,
        image: "images/oil-perfume-4.jpg",
        badge: ""
    },
    
    // Body Sprays
    {
        id: 5,
        name: "Ocean Breeze",
        category: "body-spray",
        price: 4500,
        image: "images/body-spray-1.jpg",
        badge: "Fresh"
    },
    {
        id: 6,
        name: "Citrus Burst",
        category: "body-spray",
        price: 4000,
        image: "images/body-spray-2.jpg",
        badge: "New"
    },
    {
        id: 7,
        name: "Tropical Paradise",
        category: "body-spray",
        price: 4200,
        image: "images/body-spray-3.jpg",
        badge: ""
    },
    {
        id: 8,
        name: "Lavender Dreams",
        category: "body-spray",
        price: 4500,
        image: "images/body-spray-4.jpg",
        badge: "Bestseller"
    },
    
    // Body Mists
    {
        id: 9,
        name: "Cherry Blossom",
        category: "body-mist",
        price: 3500,
        image: "images/body-mist-1.jpg",
        badge: "Light"
    },
    {
        id: 10,
        name: "Vanilla Cloud",
        category: "body-mist",
        price: 3800,
        image: "images/body-mist-2.jpg",
        badge: "Sweet"
    },
    {
        id: 11,
        name: "Peach Delight",
        category: "body-mist",
        price: 3600,
        image: "images/body-mist-3.jpg",
        badge: "New"
    },
    {
        id: 12,
        name: "Rose Garden",
        category: "body-mist",
        price: 3900,
        image: "images/body-mist-4.jpg",
        badge: ""
    },
    
    // Roll-Ons
    {
        id: 13,
        name: "Jasmine Touch",
        category: "roll-on",
        price: 2500,
        image: "images/roll-on-1.jpg",
        badge: "Travel"
    },
    {
        id: 14,
        name: "Sandalwood Essence",
        category: "roll-on",
        price: 2800,
        image: "images/roll-on-2.jpg",
        badge: "Woody"
    },
    {
        id: 15,
        name: "Mint Fresh",
        category: "roll-on",
        price: 2300,
        image: "images/roll-on-3.jpg",
        badge: "Cool"
    },
    {
        id: 16,
        name: "Lily White",
        category: "roll-on",
        price: 2600,
        image: "images/roll-on-4.jpg",
        badge: ""
    },
    
    // Perfumes
    {
        id: 17,
        name: "Elegance Noir",
        category: "perfume",
        price: 15000,
        image: "images/perfume-1.jpg",
        badge: "Luxury"
    },
    {
        id: 18,
        name: "Azure Dream",
        category: "perfume",
        price: 12000,
        image: "images/perfume-2.jpg",
        badge: "Premium"
    },
    {
        id: 19,
        name: "Golden Hour",
        category: "perfume",
        price: 13500,
        image: "images/perfume-3.jpg",
        badge: "Exclusive"
    },
    {
        id: 20,
        name: "Velvet Rose",
        category: "perfume",
        price: 14000,
        image: "images/perfume-4.jpg",
        badge: "Bestseller"
    }
];

// Category Data
const categories = [
    {
        name: "Oil Perfume",
        slug: "oil-perfume",
        count: 4,
        image: "images/category-oil.jpg"
    },
    {
        name: "Body Spray",
        slug: "body-spray",
        count: 4,
        image: "images/category-spray.jpg"
    },
    {
        name: "Body Mist",
        slug: "body-mist",
        count: 4,
        image: "images/category-mist.jpg"
    },
    {
        name: "Roll-On",
        slug: "roll-on",
        count: 4,
        image: "images/category-rollon.jpg"
    },
    {
        name: "Perfumes",
        slug: "perfume",
        count: 4,
        image: "images/category-perfume.jpg"
    }
];

// ========================================
// Navigation & Mobile Menu
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Update cart count
    updateCartCount();
});

// ========================================
// Hero Slider
// ========================================

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Show first slide
    showSlide(0);
    
    // Auto advance every 5 seconds
    setInterval(nextSlide, 5000);
}

// ========================================
// Products Page
// ========================================

function initProductsPage() {
    const productsGrid = document.getElementById('productsGrid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    if (!productsGrid) return;
    
    // Display all products initially
    displayProducts('all');
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get category
            const category = this.dataset.category;
            displayProducts(category);
        });
    });
    
    function displayProducts(category) {
        productsGrid.innerHTML = '';
        
        let filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);
        
        filteredProducts.forEach((product, index) => {
            const productCard = createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            productsGrid.appendChild(productCard);
        });
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const categoryName = getCategoryDisplayName(product.category);
    
    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='images/placeholder.jpg'">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${categoryName}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">₦${product.price.toLocaleString()}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class='bx bx-cart-add'></i>
                <span class="btn-text">Add to Cart</span>
            </button>
        </div>
    `;
    
    return card;
}

function getCategoryDisplayName(slug) {
    const categoryMap = {
        'oil-perfume': 'Oil Perfume',
        'body-spray': 'Body Spray',
        'body-mist': 'Body Mist',
        'roll-on': 'Roll-On',
        'perfume': 'Perfume'
    };
    return categoryMap[slug] || slug;
}

// ========================================
// Categories Display
// ========================================

function initCategoriesSection() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name}" class="category-image"
                 onerror="this.src='images/placeholder.jpg'">
            <div class="category-overlay">
                <h3 class="category-name">${category.name}</h3>
                <p class="category-count">${category.count} Products</p>
            </div>
        `;
        
        categoryCard.addEventListener('click', function() {
            window.location.href = `products.html?category=${category.slug}`;
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// ========================================
// Shopping Cart Functions
// ========================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success notification
    showNotification('Product added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(30, 58, 138, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// Cart Page
// ========================================

function initCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartSummary.style.display = 'none';
        emptyCartMessage.style.display = 'block';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummary.style.display = 'block';
    
    // Display cart items
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total
    updateCartTotal();
}

function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    const categoryName = getCategoryDisplayName(item.category);
    const subtotal = item.price * item.quantity;
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image"
             onerror="this.src='images/placeholder.jpg'">
        <div class="cart-item-details">
            <div class="cart-item-category">${categoryName}</div>
            <h3>${item.name}</h3>
            <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class='bx bx-minus'></i>
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class='bx bx-plus'></i>
                </button>
            </div>
        </div>
        <div class="cart-item-actions">
            <div class="cart-item-subtotal">₦${subtotal.toLocaleString()}</div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                <i class='bx bx-trash'></i>
            </button>
        </div>
    `;
    
    return div;
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
    showNotification('Item removed from cart');
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const totalElement = document.getElementById('cartTotal');
    if (totalElement) {
        totalElement.textContent = `₦${total.toLocaleString()}`;
    }
}

function proceedToPayment() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    window.location.href = 'payment.html';
}

// ========================================
// Payment Page
// ========================================

function initPaymentPage() {
    const orderSummaryContainer = document.getElementById('orderSummary');
    if (!orderSummaryContainer) return;
    
    displayOrderSummary();
}

function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummaryContainer = document.getElementById('orderSummary');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    orderSummaryContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div>
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-details">
                    <span>Qty: ${item.quantity}</span> × <span>₦${item.price.toLocaleString()}</span>
                </div>
            </div>
            <div class="order-item-details">
                <strong>₦${subtotal.toLocaleString()}</strong>
            </div>
        `;
        orderSummaryContainer.appendChild(orderItem);
    });
    
    // Add total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `
        <span>Total:</span>
        <span>₦${total.toLocaleString()}</span>
    `;
    orderSummaryContainer.appendChild(totalDiv);
}

function sendWhatsAppReceipt() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;
    
    // Build message
    let message = "Hello, I have completed payment. Here is my receipt:\n\n";
    message += "*Order Summary:*\n";
    message += "━━━━━━━━━━━━━━━━\n";
    
    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `${index + 1}. ${item.name}\n`;
        message += `   Qty: ${item.quantity} × ₦${item.price.toLocaleString()}\n`;
        message += `   Subtotal: ₦${subtotal.toLocaleString()}\n\n`;
    });
    
    message += "━━━━━━━━━━━━━━━━\n";
    message += `*Total Amount: ₦${total.toLocaleString()}*\n\n`;
    message += "Thank you for your business!";
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "2347040062388"; // Format: country code + number without +
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// ========================================
// Initialize based on current page
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Home page
    if (currentPage === 'index.html' || currentPage === '') {
        initHeroSlider();
        initCategoriesSection();
    }
    
    // Products page
    if (currentPage === 'products.html') {
        initProductsPage();
        
        // Check for category parameter
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        if (category) {
            const tab = document.querySelector(`[data-category="${category}"]`);
            if (tab) tab.click();
        }
    }
    
    // Cart page
    if (currentPage === 'cart.html') {
        initCartPage();
    }
    
    // Payment page
    if (currentPage === 'payment.html') {
        initPaymentPage();
    }
    
    // Add scroll animations
    observeElements();
});

// ========================================
// Scroll Animations
// ========================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-header, .product-card, .category-card').forEach(el => {
        observer.observe(el);
    });
}
