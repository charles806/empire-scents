const Security = {
    sanitizeHTML(str) {
        if (typeof str !== 'string') return str;
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    sanitizeProduct(product) {
        return {
            id: Number(product.id) || 0,
            name: this.sanitizeHTML(String(product.name || '')),
            category: this.sanitizeHTML(String(product.category || '')),
            price: Math.max(0, Number(product.price) || 0),
            image: this.sanitizeURL(product.image || ''),
            badge: this.sanitizeHTML(String(product.badge || ''))
        };
    },

    sanitizeURL(url) {
        if (typeof url !== 'string') return '';
        const trimmed = url.trim().toLowerCase();
        if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
            return '';
        }
        return url;
    },

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    validatePhone(phone) {
        const regex = /^[+]?[\d\s-]{10,}$/;
        return regex.test(phone);
    },

    validatePrice(price) {
        const num = Number(price);
        return !isNaN(num) && num >= 0;
    },

    validateRequired(value) {
        return typeof value === 'string' && value.trim().length > 0;
    },

    escapeSelector(selector) {
        if (typeof selector !== 'string') return '';
        return selector.replace(/[!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~]/g, '\\$&');
    },

    generateToken(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < length; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    },

    setAuthToken(token) {
        sessionStorage.setItem('admin_token', token);
    },

    getAuthToken() {
        return sessionStorage.getItem('admin_token');
    },

    clearAuthToken() {
        sessionStorage.removeItem('admin_token');
    },

    isAuthenticated() {
        return this.getAuthToken() !== null;
    },

    validateAdminPassword(password) {
        const ADMIN_PASSWORD = 'EmiperAdmin2026!';
        return password === ADMIN_PASSWORD;
    },

    login(password) {
        if (this.validateAdminPassword(password)) {
            const token = this.generateToken();
            this.setAuthToken(token);
            return { success: true, token };
        }
        return { success: false, error: 'Invalid password' };
    },

    logout() {
        this.clearAuthToken();
    }
};

const CSP_HEADER = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: blob: https:;
    connect-src 'self' https: wss:;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
`.trim().replace(/\s+/g, ' ');

function applyCSP() {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = CSP_HEADER;
    document.head.appendChild(meta);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCSP);
} else {
    applyCSP();
}
