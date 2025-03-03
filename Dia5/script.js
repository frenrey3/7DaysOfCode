// Initialize shopping list object with categories
let shoppingList = {
    frutas: [],
    verduras: [],
    lacteos: [],
    panaderia: [],
    carnes: [],
    congelados: [],
    bebidas: [],
    limpieza: [],
    otros: []
};

// Category icons mapping
const categoryIcons = {
    frutas: 'fa-apple-alt',
    verduras: 'fa-carrot',
    lacteos: 'fa-cheese',
    panaderia: 'fa-bread-slice',
    carnes: 'fa-drumstick-bite',
    congelados: 'fa-snowflake',
    bebidas: 'fa-wine-bottle',
    limpieza: 'fa-broom',
    otros: 'fa-shopping-bag'
};

// Select DOM elements
const form = document.getElementById('shopping-list-form');
const shoppingListElement = document.getElementById('shopping-list');
const categoriesSummary = document.getElementById('categories-summary');
const clearButton = document.getElementById('btn-clear');
const printButton = document.getElementById('print-list');
const exitButton = document.getElementById('exit-button');

// Add item to shopping list
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const itemInput = document.getElementById('item');
    const categorySelect = document.getElementById('category');
    const item = itemInput.value.trim();
    const category = categorySelect.value;

    if (item !== '') {
        // Add item to the category
        shoppingList[category].push({
            name: item,
            checked: false,
            id: Date.now()
        });

        // Clear input field
        itemInput.value = '';

        // Update UI
        updateUI();

        // Show success notification
        showNotification(`"${item}" añadido a ${getCategoryDisplayName(category)}`);
    }
});

// Clear all items
clearButton.addEventListener('click', function() {
    if (confirm('¿Estás seguro que deseas borrar toda la lista?')) {
        for (const category in shoppingList) {
            shoppingList[category] = [];
        }
        updateUI();
        showNotification('Lista de compras eliminada');
    }
});

// Print list
printButton.addEventListener('click', function() {
    window.print();
});

// Exit to Google
exitButton.addEventListener('click', function() {
    window.location.href = 'https://www.google.com';
});

// Update the UI with current shopping list data
function updateUI() {
    updateShoppingList();
    updateSummary();
    saveToLocalStorage();
}

// Update shopping list display
function updateShoppingList() {
    shoppingListElement.innerHTML = '';

    let isEmpty = true;

    for (const category in shoppingList) {
        if (shoppingList[category].length > 0) {
            isEmpty = false;

            // Create category card
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card', `category-${category}`);

            // Category header
            const categoryHeader = document.createElement('div');
            categoryHeader.classList.add('category-header');
            categoryHeader.innerHTML = `
                <i class="fas ${categoryIcons[category]}"></i>
                <h3>${getCategoryDisplayName(category)} (${shoppingList[category].length})</h3>
            `;
            categoryCard.appendChild(categoryHeader);

            // Category items
            const categoryItems = document.createElement('div');
            categoryItems.classList.add('category-items');

            shoppingList[category].forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');
                if (item.checked) {
                    itemElement.classList.add('item-checked');
                }

                itemElement.innerHTML = `
                    <span class="item-check">
                        <input type="checkbox" id="check-${item.id}" 
                        ${item.checked ? 'checked' : ''}>
                    </span>
                    <span class="item-text">${item.name}</span>
                    <button class="item-remove" data-id="${item.id}" data-category="${category}">
                        <i class="fas fa-times"></i>
                    </button>
                `;

                categoryItems.appendChild(itemElement);

                // Add event listener to checkbox
                const checkbox = itemElement.querySelector(`#check-${item.id}`);
                checkbox.addEventListener('change', function() {
                    toggleItemCheck(category, item.id, this.checked);
                });

                // Add event listener to remove button
                const removeButton = itemElement.querySelector('.item-remove');
                removeButton.addEventListener('click', function() {
                    removeItem(this.dataset.category, parseInt(this.dataset.id));
                });
            });

            categoryCard.appendChild(categoryItems);
            shoppingListElement.appendChild(categoryCard);
        }
    }

    if (isEmpty) {
        shoppingListElement.innerHTML = `
            <div class="empty-list">
                <i class="fas fa-shopping-cart fa-3x" style="color: #ccc; margin-bottom: 15px;"></i>
                <h3>Tu lista de compras está vacía</h3>
                <p>Agrega artículos usando el formulario</p>
            </div>
        `;
    }
}

// Update summary section
function updateSummary() {
    categoriesSummary.innerHTML = '';

    let totalItems = 0;

    for (const category in shoppingList) {
        if (shoppingList[category].length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-summary');
            categoryDiv.innerHTML = `
                <span><i class="fas ${categoryIcons[category]}"></i> ${getCategoryDisplayName(category)}</span>
                <span>${shoppingList[category].length}</span>
            `;
            categoriesSummary.appendChild(categoryDiv);

            totalItems += shoppingList[category].length;
        }
    }

    if (totalItems > 0) {
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('category-summary');
        totalDiv.style.fontWeight = 'bold';
        totalDiv.innerHTML = `
            <span>Total</span>
            <span>${totalItems}</span>
        `;
        categoriesSummary.appendChild(totalDiv);
    } else {
        categoriesSummary.innerHTML = '<p>No hay artículos en la lista</p>';
    }
}

// Toggle item check state
function toggleItemCheck(category, id, checked) {
    const index = shoppingList[category].findIndex(item => item.id === id);
    if (index !== -1) {
        shoppingList[category][index].checked = checked;
        updateUI();
    }
}

// Remove item from shopping list
function removeItem(category, id) {
    const index = shoppingList[category].findIndex(item => item.id === id);
    if (index !== -1) {
        const itemName = shoppingList[category][index].name;
        shoppingList[category].splice(index, 1);
        updateUI();
        showNotification(`"${itemName}" eliminado de la lista`);
    }
}

// Get display name for category
function getCategoryDisplayName(category) {
    const names = {
        frutas: 'Frutas',
        verduras: 'Verduras',
        lacteos: 'Lácteos',
        panaderia: 'Panadería',
        carnes: 'Carnes',
        congelados: 'Congelados',
        bebidas: 'Bebidas',
        limpieza: 'Limpieza',
        otros: 'Otros'
    };

    return names[category] || category;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Load data from localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('shoppingList');
    if (savedData) {
        shoppingList = JSON.parse(savedData);
        updateUI();
    }
}

// Initialize the app
loadFromLocalStorage();
