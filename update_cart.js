const fs = require('fs');
const path = require('path');

const basePath = 'E:/Shlok Enterprises';
const files = ['index.html', 'products.html', 'services.html', 'contact.html'];

const cartHTML = `
    <!-- Shopping Cart Overlay & Panel -->
    <div class="cart-overlay" id="cartOverlay"></div>
    <div class="cart-panel" id="cartPanel">
        <div class="cart-header">
            <h2>Your Cart</h2>
            <button class="close-cart-btn" id="closeCartBtn">&times;</button>
        </div>
        <div class="cart-items" id="cartItems">
            <!-- Items will be injected here -->
        </div>
        <div class="cart-footer">
            <div class="cart-total-row">
                <span>Total:</span>
                <span id="cartTotal">₹0.00</span>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="checkoutCart()">Proceed to Checkout</button>
        </div>
    </div>
`;

files.forEach(file => {
    const filePath = path.join(basePath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Append cart panel before </body>
    if (!content.includes('id="cartPanel"')) {
        content = content.replace('</body>', cartHTML + '</body>');
    }

    // Update buttons in products.html
    if (file === 'products.html') {
        const regex = /<div class="card-img">\s*<img src="([^"]+)"[\s\S]*?<h3>([^<]+)<\/h3>[\s\S]*?<span class="price">₹([0-9.]+)[^<]*<\/span>\s*<a href="contact\.html\?product=[^"]+" class="btn btn-outline">Enquire Now<\/a>/g;
        
        content = content.replace(regex, (match, img, title, price) => {
            const newBtn = `<a href="#" class="btn btn-outline add-to-cart-btn" data-name="${title.trim()}" data-price="${price.trim()}" data-img="${img.trim()}">Add to Cart</a>`;
            return match.replace(/<a href="contact\.html\?product=[^"]+" class="btn btn-outline">Enquire Now<\/a>/, newBtn);
        });
        
        // Handle prices without .00, e.g., ₹114 / 1kg
        const regex2 = /<div class="card-img">\s*<img src="([^"]+)"[\s\S]*?<h3>([^<]+)<\/h3>[\s\S]*?<span class="price">₹([0-9]+)\s*\/[^<]*<\/span>\s*<a href="contact\.html\?product=[^"]+" class="btn btn-outline">Enquire Now<\/a>/g;
        content = content.replace(regex2, (match, img, title, price) => {
            const newBtn = `<a href="#" class="btn btn-outline add-to-cart-btn" data-name="${title.trim()}" data-price="${price.trim()}" data-img="${img.trim()}">Add to Cart</a>`;
            return match.replace(/<a href="contact\.html\?product=[^"]+" class="btn btn-outline">Enquire Now<\/a>/, newBtn);
        });
    }

    fs.writeFileSync(filePath, content);
});

console.log("Cart HTML and buttons updated successfully.");