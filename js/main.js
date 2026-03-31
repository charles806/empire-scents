// Main Application JavaScript
// Empier Scents - Premium Fragrance E-commerce

document.addEventListener('DOMContentLoaded', function() {
    App.init();
});

const App = {
    products: [],
    
    async init() {
        ThemeManager.init();
        await this.loadProducts();
        Navigation.init();
        this.initPage();
        this.updateProductCount();
    },

    async loadProducts() {
        try {
            this.products = await ProductService.getAll();
        } catch (error) {
            console.error('Failed to load products:', error);
            this.products = DEFAULT_PRODUCTS;
        }
    },

    initPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (currentPage === 'index.html' || currentPage === '') {
            HomePage.init(this.products);
        } else if (currentPage === 'products.html') {
            ProductsPage.init(this.products);
        } else if (currentPage === 'cart.html') {
            CartPage.init();
        } else if (currentPage === 'payment.html') {
            PaymentPage.init();
        } else if (currentPage === 'admin.html') {
            AdminPage.init();
        } else if (currentPage === 'contact.html') {
            ContactPage.init();
        } else if (currentPage === 'about.html') {
            AboutPage.init();
        }
    },

    async updateProductCount() {
        const count = await ProductService.getCount();
        const badge = document.querySelector('.product-count-badge');
        if (badge) {
            badge.textContent = `${count} Products`;
        }
    }
};

const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        this.createToggle();
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        this.updateIcon(newTheme);
    },

    updateIcon(theme) {
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
        }
    },

    createToggle() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        const themeBtn = document.createElement('button');
        themeBtn.className = 'theme-toggle';
        themeBtn.setAttribute('aria-label', 'Toggle theme');
        themeBtn.innerHTML = '<i class="bx bx-moon"></i>';
        
        const currentTheme = localStorage.getItem('theme') || 'light';
        this.updateIcon(currentTheme);

        themeBtn.addEventListener('click', () => this.toggle());
        
        const cartLi = navMenu.querySelector('li:last-child');
        if (cartLi) {
            navMenu.insertBefore(themeBtn, cartLi);
        }
    }
};

const Navigation = {
    init() {
        this.mobileMenu();
        this.headerScroll();
        this.activeLink();
        CartManager.init();
    },

    mobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });

            menu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                });
            });
        }
    },

    headerScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    activeLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
};

const HomePage = {
    init(products) {
        HeroSlider.init();
        this.renderCategories();
        this.renderFeaturedProducts(products);
        ScrollAnimations.init();
    },

    renderCategories() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;

        grid.innerHTML = CATEGORIES.map((category, index) => `
            <div class="category-card" data-category="${Security.sanitizeHTML(category.slug)}" 
                 style="animation-delay: ${index * 0.1}s">
                <img src="${Security.sanitizeURL(category.image)}" 
                     alt="${Security.sanitizeHTML(category.name)}" 
                     class="category-image"
                     onerror="this.src='images/placeholder.jpg'">
                <div class="category-overlay">
                    <h3 class="category-name">${Security.sanitizeHTML(category.name)}</h3>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                window.location.href = `products.html?category=${encodeURIComponent(category)}`;
            });
        });
    },

    renderFeaturedProducts(products) {
        const container = document.getElementById('featuredProducts');
        if (!container) return;

        const featured = products
            .filter(p => p.badge === 'Bestseller')
            .slice(0, 4);

        const remaining = featured.length < 4 
            ? products.filter(p => p.badge !== 'Bestseller').slice(0, 4 - featured.length)
            : [];

        const displayProducts = [...featured, ...remaining];

        container.innerHTML = displayProducts.map((product, index) => 
            ProductCard.create(product, index)
        ).join('');
    }
};

const ProductsPage = {
    init(products) {
        this.products = products;
        this.renderFilterTabs();
        this.renderProducts('all');
        this.checkCategoryParam();
    },

    renderFilterTabs() {
        const container = document.querySelector('.filter-tabs');
        if (!container) return;

        const tabs = [
            { name: 'All Products', slug: 'all' },
            ...CATEGORIES
        ];

        container.innerHTML = tabs.map(tab => `
            <button class="filter-tab ${tab.slug === 'all' ? 'active' : ''}" 
                    data-category="${Security.sanitizeHTML(tab.slug)}">
                ${Security.sanitizeHTML(tab.name)}
            </button>
        `).join('');

        container.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.renderProducts(tab.dataset.category);
            });
        });
    },

    renderProducts(category) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const filtered = category === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === category);

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="text-center" style="grid-column: 1/-1; padding: 3rem;">
                    <i class="bx bx-package" style="font-size: 4rem; color: var(--color-gray);"></i>
                    <h3 style="margin-top: 1rem;">No products found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map((product, index) => 
            ProductCard.create(product, index)
        ).join('');
    },

    checkCategoryParam() {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        
        if (category) {
            const tab = document.querySelector(`[data-category="${Security.escapeSelector(category)}"]`);
            if (tab) {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.renderProducts(category);
            }
        }
    }
};

const ProductCard = {
    create(product, index = 0) {
        const sanitized = Security.sanitizeProduct(product);
        const categoryName = this.getCategoryName(sanitized.category);

        return `
            <div class="product-card" style="animation-delay: ${index * 0.1}s">
                <div class="product-image-wrapper">
                    <img src="${sanitized.image}" alt="${sanitized.name}" class="product-image" 
                         onerror="this.src='images/placeholder.jpg'">
                    ${sanitized.badge ? `<span class="product-badge">${sanitized.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-category">${categoryName}</div>
                    <h3 class="product-name">${sanitized.name}</h3>
                    <div class="product-price">₦${Number(sanitized.price).toLocaleString()}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${sanitized.id})">
                        <i class='bx bx-cart-add'></i>
                        <span class="btn-text">Add to Cart</span>
                    </button>
                </div>
            </div>
        `;
    },

    getCategoryName(slug) {
        const map = {
            'oil-perfume': 'Oil Perfume',
            'body-spray': 'Body Spray',
            'body-mist': 'Body Mist',
            'roll-on': 'Roll-On',
            'perfume': 'Perfume'
        };
        return map[slug] || slug;
    }
};

const CartManager = {
    init() {
        this.updateCount();
    },

    getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    },

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCount();
    },

    updateCount() {
        const cart = this.getCart();
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const badge = document.querySelector('.cart-count');
        if (badge) {
            badge.textContent = total;
            badge.style.display = total > 0 ? 'flex' : 'none';
        }
    },

    add(productId) {
        const products = (typeof App !== 'undefined' && App.products && App.products.length > 0) 
            ? App.products 
            : DEFAULT_PRODUCTS;
        const product = products.find(p => p.id === Number(productId));
        
        if (!product) return;

        let cart = this.getCart();
        const existing = cart.find(item => item.id === Number(productId));

        if (existing) {
            existing.quantity += 1;
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

        this.saveCart(cart);
        Notification.show('Product added to cart!', 'success');
    },

    remove(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== Number(productId));
        this.saveCart(cart);
        Notification.show('Item removed from cart', 'success');
    },

    updateQuantity(productId, change) {
        let cart = this.getCart();
        const item = cart.find(i => i.id === Number(productId));

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.remove(productId);
                return;
            }
            this.saveCart(cart);
        }
    },

    getTotal() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    clear() {
        localStorage.removeItem('cart');
        this.updateCount();
    }
};

const CartPage = {
    init() {
        this.render();
    },

    render() {
        const cart = CartManager.getCart();
        const container = document.getElementById('cartItems');
        const empty = document.getElementById('emptyCart');
        const summary = document.getElementById('cartSummary');

        if (!container || !empty || !summary) return;

        if (cart.length === 0) {
            container.style.display = 'none';
            summary.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        container.style.display = 'block';
        summary.style.display = 'block';
        empty.style.display = 'none';

        container.innerHTML = cart.map(item => this.createCartItem(item)).join('');
        this.updateTotal();
    },

    createCartItem(item) {
        const categoryName = ProductCard.getCategoryName(item.category);
        const subtotal = item.price * item.quantity;

        return `
            <div class="cart-item">
                <img src="${Security.sanitizeURL(item.image)}" alt="${Security.sanitizeHTML(item.name)}" 
                     class="cart-item-image" onerror="this.src='images/placeholder.jpg'">
                <div class="cart-item-details">
                    <div class="cart-item-category">${categoryName}</div>
                    <h3>${Security.sanitizeHTML(item.name)}</h3>
                    <div class="cart-item-price">₦${Number(item.price).toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="CartManager.updateQuantity(${item.id}, -1)">
                            <i class='bx bx-minus'></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="CartManager.updateQuantity(${item.id}, 1)">
                            <i class='bx bx-plus'></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-subtotal">₦${subtotal.toLocaleString()}</div>
                    <button class="remove-item-btn" onclick="CartManager.remove(${item.id}); CartPage.render();">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        `;
    },

    updateTotal() {
        const total = CartManager.getTotal();
        const elements = ['cartTotal', 'cartTotal2'];
        
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = `₦${total.toLocaleString()}`;
        });
    }
};

const PaymentPage = {
    init() {
        this.renderOrderSummary();
        this.renderPaymentDetails();
    },

    renderOrderSummary() {
        const container = document.getElementById('orderSummary');
        if (!container) return;

        const cart = CartManager.getCart();
        
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        let total = 0;
        
        container.innerHTML = cart.map(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            return `
                <div class="order-item">
                    <div>
                        <div class="order-item-name">${Security.sanitizeHTML(item.name)}</div>
                        <div class="order-item-details">
                            <span>Qty: ${item.quantity}</span> × <span>₦${Number(item.price).toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="order-item-details">
                        <strong>₦${subtotal.toLocaleString()}</strong>
                    </div>
                </div>
            `;
        }).join('') + `
            <div class="cart-total">
                <span>Total:</span>
                <span>₦${total.toLocaleString()}</span>
            </div>
        `;
    },

    renderPaymentDetails() {
        const accountNumber = document.getElementById('accountNumber');
        const accountName = document.getElementById('accountName');
        const bankName = document.getElementById('bankName');

        if (accountNumber) accountNumber.textContent = PAYMENT_DETAILS.accountNumber;
        if (accountName) accountName.textContent = PAYMENT_DETAILS.accountName;
        if (bankName) bankName.textContent = PAYMENT_DETAILS.bank;
    },

    copyAccountNumber() {
        navigator.clipboard.writeText(PAYMENT_DETAILS.accountNumber)
            .then(() => Notification.show('Account number copied!', 'success'))
            .catch(() => Notification.show('Failed to copy', 'error'));
    }
};

const ContactPage = {
    init() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone') || '';
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!Security.validateEmail(email)) {
            Notification.show('Please enter a valid email', 'error');
            return;
        }

        let whatsappMessage = `*New Contact Form Submission*\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;
        whatsappMessage += `*Email:* ${email}\n`;
        if (phone) whatsappMessage += `*Phone:* ${phone}\n`;
        whatsappMessage += `*Subject:* ${subject}\n\n`;
        whatsappMessage += `*Message:*\n${message}`;

        const encoded = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/2347040062388?text=${encoded}`, '_blank');
        
        Notification.show('Redirecting to WhatsApp...', 'success');
        e.target.reset();
    }
};

const AboutPage = {
    init() {
        ScrollAnimations.init();
    }
};

const HeroSlider = {
    init() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        let current = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        showSlide(0);

        setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 5000);
    }
};

const ScrollAnimations = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-header, .product-card, .category-card, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }
};

const Notification = {
    show(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.textContent = message;
        
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
};

const AdminPage = {
    products: [],
    
    async init() {
        if (!Security.isAuthenticated()) {
            this.showLoginModal();
            return;
        }
        
        await this.loadProducts();
        this.render();
    },

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) modal.classList.add('active');
    },

    login(password) {
        const result = Security.login(password);
        if (result.success) {
            document.getElementById('loginModal')?.classList.remove('active');
            this.init();
        } else {
            Notification.show(result.error, 'error');
        }
    },

    logout() {
        Security.logout();
        window.location.reload();
    },

    async loadProducts() {
        try {
            this.products = await ProductService.getAll();
        } catch (error) {
            this.products = DEFAULT_PRODUCTS;
        }
    },

    render() {
        this.renderStats();
        this.renderProductTable();
    },

    renderStats() {
        const totalProducts = this.products.length;
        const totalValue = this.products.reduce((sum, p) => sum + Number(p.price), 0);
        const categories = [...new Set(this.products.map(p => p.category))].length;

        const stats = [
            { icon: 'bx-package', value: totalProducts, label: 'Total Products' },
            { icon: 'bx-naira', value: `₦${totalValue.toLocaleString()}`, label: 'Total Value' },
            { icon: 'bx-category', value: categories, label: 'Categories' }
        ];

        const container = document.getElementById('adminStats');
        if (!container) return;

        container.innerHTML = stats.map(stat => `
            <div class="stat-card">
                <div class="stat-icon"><i class="bx ${stat.icon}"></i></div>
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    },

    renderProductTable() {
        const tbody = document.getElementById('productTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td data-label="Image"><img src="${Security.sanitizeURL(product.image)}" alt="${Security.sanitizeHTML(product.name)}" 
                         onerror="this.src='images/placeholder.jpg'"></td>
                <td data-label="Name">${Security.sanitizeHTML(product.name)}</td>
                <td data-label="Category">${Security.sanitizeHTML(product.category)}</td>
                <td data-label="Price">₦${Number(product.price).toLocaleString()}</td>
                <td data-label="Badge">${product.badge ? Security.sanitizeHTML(product.badge) : '-'}</td>
                <td data-label="Actions">
                    <div class="action-btns">
                        <button class="action-btn edit" onclick="AdminPage.editProduct(${product.id})">
                            <i class="bx bx-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="AdminPage.deleteProduct(${product.id})">
                            <i class="bx bx-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    async deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await ProductService.delete(id);
            await this.loadProducts();
            this.render();
            Notification.show('Product deleted successfully', 'success');
        } catch (error) {
            Notification.show('Failed to delete product', 'error');
        }
    },

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;

        document.getElementById('editId').value = product.id;
        document.getElementById('editName').value = product.name;
        document.getElementById('editCategory').value = product.category;
        document.getElementById('editPrice').value = product.price;
        document.getElementById('editImage').value = product.image;
        document.getElementById('editBadge').value = product.badge || '';
        
        const preview = document.getElementById('imagePreview');
        const placeholder = document.getElementById('imagePlaceholder');
        if (product.image) {
            preview.src = product.image;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        } else {
            preview.style.display = 'none';
            placeholder.style.display = 'flex';
        }
        document.getElementById('editImageFile').value = '';

        document.getElementById('productModal')?.classList.add('active');
    },

    async saveProduct(e) {
        e.preventDefault();

        const id = document.getElementById('editId').value;
        const product = {
            name: document.getElementById('editName').value,
            category: document.getElementById('editCategory').value,
            price: Number(document.getElementById('editPrice').value),
            image: document.getElementById('editImage').value,
            badge: document.getElementById('editBadge').value
        };

        try {
            if (id) {
                await ProductService.update(Number(id), product);
                Notification.show('Product updated successfully', 'success');
            } else {
                await ProductService.create(product);
                Notification.show('Product created successfully', 'success');
            }

            document.getElementById('productModal')?.classList.remove('active');
            await this.loadProducts();
            this.render();
        } catch (error) {
            Notification.show('Failed to save product', 'error');
        }
    },

    openAddModal() {
        document.getElementById('editId').value = '';
        document.getElementById('editName').value = '';
        document.getElementById('editCategory').value = 'perfume';
        document.getElementById('editPrice').value = '';
        document.getElementById('editImage').value = '';
        document.getElementById('editImageFile').value = '';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('imagePlaceholder').style.display = 'flex';

        document.getElementById('productModal')?.classList.add('active');
    },

    handleImageUpload(input) {
        const file = input.files[0];
        if (!file) return;

        const preview = document.getElementById('imagePreview');
        const placeholder = document.getElementById('imagePlaceholder');
        const hiddenInput = document.getElementById('editImage');

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
                hiddenInput.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },
};

function addToCart(productId) {
    CartManager.add(productId);
}

function updateQuantity(productId, change) {
    CartManager.updateQuantity(productId, change);
    CartPage.render();
}

function removeFromCart(productId) {
    CartManager.remove(productId);
    CartPage.render();
}

function proceedToPayment() {
    const cart = CartManager.getCart();
    if (cart.length === 0) {
        Notification.show('Your cart is empty', 'error');
        return;
    }
    window.location.href = 'payment.html';
}

function sendWhatsAppReceipt() {
    const cart = CartManager.getCart();
    if (cart.length === 0) return;

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

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2347040062388?text=${encoded}`, '_blank');
}
