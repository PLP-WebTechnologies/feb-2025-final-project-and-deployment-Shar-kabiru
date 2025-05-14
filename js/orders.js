// orders.js - My Orders Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    setupEventListeners();
});

function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    const noOrdersMessage = document.getElementById('no-orders-message');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        noOrdersMessage.style.display = 'block';
        ordersList.style.display = 'none';
    } else {
        noOrdersMessage.style.display = 'none';
        ordersList.style.display = 'block';
        displayOrders(orders);
    }
}

function displayOrders(orders) {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';

        orderElement.innerHTML = `
            <div class="order-header">
                <div class="order-info">
                    <h3>Order #${index + 1}</h3>
                    <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                    <p>Order ID: ${order.id || 'N/A'}</p>
                </div>
                <div class="order-status">
                    <div class="status-controls">
                        <span class="status-badge ${getStatusClass(order.status)}">${order.status}</span>
                        ${order.status !== 'Completed' ? `
                        <select class="status-select" data-order-index="${index}">
                            <option value="">Update Status</option>
                            ${getStatusOptions(order.status)}
                        </select>
                        ` : ''}
                    </div>
                    <p>Total: $${order.total.toFixed(2)}</p>
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <a href="product-detail.html?id=${item.id}">
                            <img src="${item.image}" alt="${item.name}" class="order-item-image">
                        </a>
                        <div class="order-item-details">
                            <a href="product-detail.html?id=${item.id}"><h4>${item.name}</h4></a>
                            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        ordersList.appendChild(orderElement);
    });
}

function getStatusOptions(currentStatus) {
    const statusFlow = {
        'Processing': ['Shipped'],
        'Shipped': ['Completed'],
        'Completed': []
    };

    return statusFlow[currentStatus].map(status =>
        `<option value="${status}">Mark as ${status}</option>`
    ).join('');
}

function setupEventListeners() {
    // Status change event delegation
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('status-select')) {
            const orderIndex = e.target.getAttribute('data-order-index');
            const newStatus = e.target.value;

            if (newStatus) {
                updateOrderStatus(orderIndex, newStatus);
            }
        }
    });
}

function updateOrderStatus(orderIndex, newStatus) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders[orderIndex]) {
        orders[orderIndex].status = newStatus;

        if (!orders[orderIndex].statusHistory) {
            orders[orderIndex].statusHistory = [];
        }

        orders[orderIndex].statusHistory.push({
            status: newStatus,
            date: new Date().toISOString()
        });

        localStorage.setItem('orders', JSON.stringify(orders));
        showNotification(`Order status updated to ${newStatus}`);
        loadOrders();
    }
}

function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'completed': return 'status-completed';
        case 'shipped': return 'status-shipped';
        case 'processing': return 'status-processing';
        default: return '';
    }
}

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
