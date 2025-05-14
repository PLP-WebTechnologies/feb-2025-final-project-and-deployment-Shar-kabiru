// products.js - Product Listing Functionality

// Sample product data with categories
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
        fullDescription: "These premium wireless headphones feature active noise cancellation technology, 30-hour battery life, and crystal-clear audio quality. Perfect for travel, work, or relaxing at home.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "audio",
        specs: [
            "Battery Life: 30 hours",
            "Bluetooth 5.0",
            "Active Noise Cancellation",
            "Weight: 254g",
            "Water Resistance: IPX4"
        ]
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Feature-packed smartwatch with health monitoring and GPS.",
        fullDescription: "Stay connected and track your fitness with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and smartphone notifications.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "wearables",
        specs: [
            "Display: 1.4\" AMOLED",
            "Battery Life: 7 days",
            "Water Resistance: 5ATM",
            "GPS + GLONASS",
            "Heart Rate Monitor"
        ]
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        description: "Portable waterproof speaker with 20-hour playtime.",
        fullDescription: "Take your music anywhere with this rugged, waterproof Bluetooth speaker. With 20 hours of playtime and powerful stereo sound, it's perfect for outdoor adventures.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "audio",
        specs: [
            "Battery Life: 20 hours",
            "IP67 Waterproof",
            "Bluetooth 5.0",
            "Driver Size: 45mm",
            "Weight: 680g"
        ]
    },
    {
        id: 4,
        name: "4K Action Camera",
        description: "Compact 4K action camera with waterproof housing.",
        fullDescription: "Capture your adventures in stunning 4K resolution with this compact action camera. Includes waterproof housing for underwater shots up to 40m and image stabilization.",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "cameras",
        specs: [
            "Resolution: 4K/30fps",
            "Waterproof to 40m",
            "Image Stabilization",
            "Battery Life: 90 mins",
            "Weight: 88g"
        ]
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        description: "True wireless earbuds with premium sound quality.",
        fullDescription: "Experience true wireless freedom with these premium earbuds. Features include touch controls, 8 hours of playtime (24 with case), and IPX5 sweat resistance.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "audio",
        specs: [
            "Battery Life: 8 hours (24 with case)",
            "Bluetooth 5.2",
            "IPX5 Sweat Resistance",
            "Touch Controls",
            "Weight: 5g per earbud"
        ]
    },
    {
        id: 6,
        name: "Fitness Tracker",
        description: "Advanced fitness tracker with heart rate monitoring.",
        fullDescription: "Track your workouts, heart rate, sleep, and more with this advanced fitness tracker. Features a color AMOLED display and 14-day battery life.",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1551649001-7a2485554199?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "wearables",
        specs: [
            "Battery Life: 14 days",
            "Heart Rate Monitor",
            "SpO2 Monitoring",
            "Water Resistance: 5ATM",
            "Weight: 23g"
        ]
    }
];

// Display featured products on home page
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    
    if (featuredContainer) {
        // Show first 4 products as featured
        const featuredProducts = products.slice(0, 6);
        
        featuredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                    </div>
                </a>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            featuredContainer.appendChild(productElement);
        });

        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

// Display all products on products page
function displayAllProducts(filter = 'all', sort = 'default') {
    const productsContainer = document.getElementById('products-grid');
    
    if (productsContainer) {
        let filteredProducts = [...products];
        
        // Apply filter
        if (filter !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === filter);
        }
        
        // Apply sorting
        switch(sort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Default sorting (by ID or whatever)
                break;
        }
        
        productsContainer.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                    </div>
                </a>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productsContainer.appendChild(productElement);
        });

        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

// Filter products by category
function filterProducts() {
    const filterValue = document.getElementById('category-filter').value;
    const sortValue = document.getElementById('sort-by').value;
    displayAllProducts(filterValue, sortValue);
}

// Sort products
function sortProducts() {
    const filterValue = document.getElementById('category-filter').value;
    const sortValue = document.getElementById('sort-by').value;
    displayAllProducts(filterValue, sortValue);
}

// Add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    displayAllProducts();
    
    // Add filter and sort functionality
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('sort-by').addEventListener('change', sortProducts);
    
    // Initialize product detail page if we're on that page
    if (document.querySelector('.product-detail-container')) {
        initProductDetail();
    }
});

// Product detail page functionality
function initProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Set main product info
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('full-description').textContent = product.fullDescription;
        document.getElementById('main-product-image').src = product.image;
        
        // Set thumbnails (using same image for all in this example)
        const thumbnailsContainer = document.querySelector('.thumbnail-images');
        thumbnailsContainer.innerHTML = `
            <img src="${product.image}" alt="Thumbnail 1" class="active">
            <img src="${product.image}" alt="Thumbnail 2">
            <img src="${product.image}" alt="Thumbnail 3">
        `;
        
        // Set specifications
        const specsList = document.getElementById('specs-list');
        specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');
        
        // Add to cart button
        document.getElementById('add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('product-quantity').value);
            addToCartWithQuantity(productId, quantity);
        });
        
        // Quantity controls
        document.querySelector('.quantity-btn.minus').addEventListener('click', function() {
            const quantityInput = document.getElementById('product-quantity');
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
        
        document.querySelector('.quantity-btn.plus').addEventListener('click', function() {
            const quantityInput = document.getElementById('product-quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        
        // Tab functionality
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update active tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
        
        // Thumbnail click functionality
        document.querySelectorAll('.thumbnail-images img').forEach(thumb => {
            thumb.addEventListener('click', function() {
                document.querySelector('.thumbnail-images img.active').classList.remove('active');
                this.classList.add('active');
                document.getElementById('main-product-image').src = this.src;
            });
        });
    } else {
        // Product not found, redirect to products page
        window.location.href = 'products.html';
    }
}

// Add to cart with specific quantity
function addToCartWithQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${quantity} ${product.name}(s) added to cart!`);
    }
}