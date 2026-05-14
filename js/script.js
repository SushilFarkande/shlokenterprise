// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Active link state
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
const menuLength = menuItems.length;
for (let i = 0; i < menuLength; i++) {
    if (menuItems[i].href === currentLocation) {
        menuItems[i].classList.add('active');
    }
}

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Animated Counters (Homepage)
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Product Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            productItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Product Search
const searchInput = document.getElementById('productSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        productItems.forEach(item => {
            const title = item.querySelector('h3').innerText.toLowerCase();
            const desc = item.querySelector('p').innerText.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }
        
        // Phone validation
        const phone = document.getElementById('phone');
        if (phone.value.trim().length < 8) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            removeError(phone);
        }
        
        // Subject validation
        const subject = document.getElementById('subject');
        if (subject.value === '') {
            showError(subject, 'Please select a subject');
            isValid = false;
        } else {
            removeError(subject);
        }
        
        // Message validation
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // Change submit button text while sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Send to Google Sheets via AJAX (Happens in background)
            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append('Name', document.getElementById('name').value);
            urlEncodedData.append('Email', document.getElementById('email').value);
            urlEncodedData.append('Phone', document.getElementById('phone').value);
            urlEncodedData.append('Subject', document.getElementById('subject').value);
            
            const pNameInput = document.getElementById('productName');
            const pQtyInput = document.getElementById('productQuantity');
            const pPriceInput = document.getElementById('productTotalPrice');
            const tAmountInput = document.getElementById('totalAmount');
            
            if (pNameInput && pNameInput.value) urlEncodedData.append('Product Name', pNameInput.value);
            if (pQtyInput && pQtyInput.value) urlEncodedData.append('Product Quantity', pQtyInput.value);
            if (pPriceInput && pPriceInput.value) urlEncodedData.append('Product Total Price', pPriceInput.value);
            if (tAmountInput && tAmountInput.value) urlEncodedData.append('Total Amount', tAmountInput.value);
            
            urlEncodedData.append('Message', document.getElementById('message').value);
            
            fetch('https://script.google.com/macros/s/AKfycbx9ntjHdYXdhyS17j2MeV8KEKQ0E7LUWjS4vA2vGSkIuykuPKewhelGT4XrPj7OTSKo/exec', {
                method: 'POST',
                mode: 'no-cors', // Prevents waiting for server redirects
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData.toString()
            }).catch(e => console.error("Background sync error:", e));

            // Optimistic UI Update: Make it feel lightning fast
            setTimeout(() => {
                // Restore button
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;

                // Show success popup
                const popup = document.getElementById('successPopup');
                if(popup) popup.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide popup after 3 seconds
                setTimeout(() => {
                    if(popup) popup.style.display = 'none';
                }, 3000);
            }, 600); // 0.6 second delay feels realistic but very fast
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector('.error-message');
    if (!error) {
        error = document.createElement('div');
        error.className = 'error-message';
        formGroup.appendChild(error);
    }
    error.innerText = message;
    error.style.display = 'block';
    input.style.borderColor = 'red';
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.style.display = 'none';
    }
    input.style.borderColor = '#dee2e6';
}

// Apply Offers dynamically
window.addEventListener('DOMContentLoaded', () => {
    if (typeof activeOffers !== 'undefined') {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const titleElement = card.querySelector('h3');
            if (!titleElement) return;
            
            const title = titleElement.innerText.trim();
            const cardImg = card.querySelector('.card-img');
            
            // Check Product Offers
            if (activeOffers.products && activeOffers.products[title]) {
                const offer = activeOffers.products[title];
                
                // Add Badge
                if (offer.discountText && cardImg) {
                    const badge = document.createElement('div');
                    badge.className = 'offer-badge';
                    badge.innerText = offer.discountText;
                    cardImg.appendChild(badge);
                }
                
                // Update Price
                if (offer.oldPrice && offer.newPrice) {
                    let priceContainer = card.querySelector('.price');
                    if (priceContainer) {
                        priceContainer.className = 'price-discount';
                        priceContainer.innerHTML = `<span class="old-price">${offer.oldPrice}</span><span class="new-price">${offer.newPrice}</span>`;
                    }
                }
            }
            
            // Check Service Offers
            if (activeOffers.services && activeOffers.services[title]) {
                const offer = activeOffers.services[title];
                
                // Add Badge
                if (offer.discountText) {
                    // For services without .card-img, prepend to card-body if cardImg is null
                    const targetContainer = cardImg || card.querySelector('.card-body');
                    if (targetContainer) {
                        const badge = document.createElement('div');
                        badge.className = 'offer-badge';
                        if (!cardImg) badge.style.position = 'relative'; // Adjust if no image container
                        badge.innerText = offer.discountText;
                        targetContainer.appendChild(badge);
                    }
                }
            }
        });
    }
});

// Product Page Header Slider
window.addEventListener('DOMContentLoaded', () => {
    const sliderImage = document.getElementById('slider-image');
    const sliderTitle = document.getElementById('slider-title');
    const sliderDesc = document.getElementById('slider-desc');

    if (sliderImage && sliderTitle && sliderDesc) {
        const slideData = [
            { img: 'images/product/Caustic Soda.jpeg', title: 'Caustic Soda', desc: 'Powerful chemical that removes tough stains while keeping fabrics bright and fresh.' },
            { img: 'images/product/colour fixer.jpeg', title: 'Colour Fixer', desc: 'Locks in fabric colors to prevent fading and bleeding during washes.' },
            { img: 'images/product/dry clean booster.jpeg', title: 'Dry Clean Booster', desc: 'Enhances dry cleaning performance to remove tough stains effortlessly.' },
            { img: 'images/product/fabric softner.jpeg', title: 'Fabric Softener', desc: 'Leaves clothes feeling incredibly soft and smelling fresh for longer.' },
            { img: 'images/product/hypo.jpeg', title: 'Hypo Liquid Bleach', desc: 'Advanced whitening formula for brighter, cleaner, and fresher Whites.' },
            { img: 'images/product/ink remover.jpeg', title: 'Ink Remover Liquid', desc: 'Powerful formula that removes ink stains from fabrics with ease.' },
            { img: 'images/product/MLC 200R.jpeg', title: 'MLC 200 R', desc: 'Industrial grade stain remover for commercial laundry applications.' },
            { img: 'images/product/optical bright.jpeg', title: 'Optical Brightener', desc: 'Enhances fabric brightness for a cleaner, more vibrant look.' },
            { img: 'images/product/oxy bleach.jpeg', title: 'Oxy Bleach', desc: 'Color-safe bleach that removes tough stains while keeping fabrics bright.' },
            { img: 'images/product/pdl.jpeg', title: 'Detergent Liquid', desc: 'High-efficiency concentrated liquid detergent for commercial machines.' },
            { img: 'images/product/pdp.jpeg', title: 'Premium Detergent Powder', desc: 'Powerful detergent powder for deep cleaning, tough stain removal, and long-lasting freshness.' },
            { img: 'images/product/rust remover.jpeg', title: 'Rust Remover Liquid', desc: 'Powerful formula to lift rust, oil, grease, and tough stains easily.' },
            { img: 'images/product/Ultra premium.jpeg', title: 'Ultra Premium Detergent', desc: 'Powerful detergent powder for White Clothes to deep clean and remove tough stains.' },
            { img: 'images/product/detergent powder.jpeg', title: 'Detergent Powder', desc: 'Effective powder detergent for everyday laundry needs and freshness.' }
        ];
        let currentIndex = 0;

        setInterval(() => {
            // Fade out
            sliderImage.style.opacity = 0;
            sliderTitle.style.opacity = 0;
            sliderDesc.style.opacity = 0;
            sliderImage.style.transform = 'scale(0.95)';

            setTimeout(() => {
                // Change content
                currentIndex = (currentIndex + 1) % slideData.length;
                sliderImage.src = slideData[currentIndex].img;
                sliderTitle.innerText = slideData[currentIndex].title;
                sliderDesc.innerText = slideData[currentIndex].desc;

                // Fade in
                sliderImage.style.opacity = 1;
                sliderTitle.style.opacity = 1;
                sliderDesc.style.opacity = 1;
                sliderImage.style.transform = 'scale(1)';
            }, 400); // Wait 0.4s for fade out before changing content
        }, 2500); // Change every 2.5 seconds
    }
});

// --- Shopping Cart Logic ---
let cart = JSON.parse(localStorage.getItem('shlok_cart')) || [];

function saveCart() {
    localStorage.setItem('shlok_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const badge = document.querySelector('.cart-badge');
    const itemsContainer = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if(!badge || !itemsContainer || !totalElement) return;

    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update Items List
    itemsContainer.innerHTML = '';
    let totalPrice = 0;
    let totalDiscount = 0;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
    } else {
        cart.forEach((item, index) => {
            let itemPrice = item.price;
            let itemTotal = itemPrice * item.qty;
            let itemDiscount = 0;
            let hasDiscount = false;

            // Bulk Discount Logic: 10% off for 100+ (kg) or 35+ (L/kg depending on product)
            // Assuming qty refers to units (1 unit = 1L or 1kg)
            if (item.qty >= 35) { // Applying baseline 35+ units for 10% bulk discount
                itemDiscount = itemTotal * 0.10;
                itemTotal = itemTotal - itemDiscount;
                totalDiscount += itemDiscount;
                hasDiscount = true;
            }

            totalPrice += itemTotal;
            
            const priceDisplay = hasDiscount 
                ? `<span style="text-decoration: line-through; color: #999; font-size: 0.8em;">₹${(item.price * item.qty).toFixed(2)}</span> <br> <span style="color: #28a745;">₹${itemTotal.toFixed(2)} (-10% Bulk)</span>`
                : `₹${itemTotal.toFixed(2)}`;

            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${priceDisplay}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                            <input type="number" min="1" value="${item.qty}" class="cart-qty-input" onchange="setQty(${index}, this.value)" style="width: 50px; text-align: center; border: 1px solid var(--border-color); border-radius: 4px; background: transparent; color: inherit;">
                            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    if (totalDiscount > 0) {
        totalElement.innerHTML = `<span style="font-size: 0.8em; color: #28a745;">Saved ₹${totalDiscount.toFixed(2)}!</span><br>₹${totalPrice.toFixed(2)}`;
    } else {
        totalElement.innerText = `₹${totalPrice.toFixed(2)}`;
    }
}

// Global functions for inline onclick handlers
window.changeQty = function(index, delta) {
    if(cart[index]) {
        cart[index].qty += delta;
        if(cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    }
};

window.setQty = function(index, value) {
    if(cart[index]) {
        let newQty = parseInt(value);
        if(isNaN(newQty) || newQty <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].qty = newQty;
        }
        saveCart();
        updateCartUI();
    }
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
};

window.checkoutCart = function() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "contact.html?checkout=true";
};

// Initialize Cart UI and Add to Cart buttons
window.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Toggle Cart Panel
    const cartIcon = document.getElementById('cartIcon');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');

    if(cartIcon && cartPanel && cartOverlay && closeCartBtn) {
        const openCart = () => {
            cartPanel.classList.add('open');
            cartOverlay.classList.add('open');
        };
        const closeCart = () => {
            cartPanel.classList.remove('open');
            cartOverlay.classList.remove('open');
        };

        cartIcon.addEventListener('click', openCart);
        closeCartBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
    }

    // Add to Cart Buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const img = btn.getAttribute('data-img');

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ name, price, img, qty: 1 });
            }

            saveCart();
            updateCartUI();
            
            // Show feedback
            const originalText = btn.innerText;
            btn.innerText = "Added!";
            btn.style.backgroundColor = "#28a745";
            btn.style.color = "white";
            btn.style.borderColor = "#28a745";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
                btn.style.borderColor = "";
            }, 1000);
            
            // Open cart
            if(cartPanel) {
                cartPanel.classList.add('open');
                cartOverlay.classList.add('open');
            }
        });
    });

            // Handle Checkout Auto-fill on Contact Page
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('checkout') === 'true') {
        const subjectSelect = document.getElementById('subject');
        const messageArea = document.getElementById('message');
        const pNameInput = document.getElementById('productName');
        const pQtyInput = document.getElementById('productQuantity');
        const pPriceInput = document.getElementById('productTotalPrice');
        const tAmountInput = document.getElementById('totalAmount');
        
        if (subjectSelect && messageArea && cart.length > 0) {
            subjectSelect.value = 'product_inquiry';
            
            let orderText = "--- NEW ORDER ---\n\n";
            let names = [];
            let quantities = [];
            let prices = [];
            let finalTotal = 0;

            cart.forEach(item => {
                let itemTotal = item.price * item.qty;
                if (item.qty >= 35) {
                    itemTotal = itemTotal * 0.90; // Apply 10% discount
                }
                finalTotal += itemTotal;
                
                names.push(item.name);
                quantities.push(item.qty.toString());
                prices.push(`₹${itemTotal.toFixed(2)}`);

                orderText += `${item.qty}x ${item.name} - ₹${itemTotal.toFixed(2)}\n`;
            });
            orderText += `\nTOTAL AMOUNT: ₹${finalTotal.toFixed(2)}\n\n`;
            orderText += "Please confirm my order and let me know the payment/delivery details.";
            
            messageArea.value = orderText;
            
            if (pNameInput) pNameInput.value = names.join('\n');
            if (pQtyInput) pQtyInput.value = quantities.join('\n');
            if (pPriceInput) pPriceInput.value = prices.join('\n');
            if (tAmountInput) tAmountInput.value = `₹${finalTotal.toFixed(2)}`;
            
            // Hook into the form submit to clear it.
            const contactForm = document.getElementById('contactForm');
            if(contactForm) {
                contactForm.addEventListener('submit', () => {
                    if(messageArea.value.includes("--- NEW ORDER ---")) {
                        cart = [];
                        saveCart();
                        updateCartUI();
                    }
                });
            }
        }
    }
});