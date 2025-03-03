// Elementos del DOM
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');
const emptyList = document.getElementById('empty-list');
const itemsCounter = document.getElementById('items-counter');
const notification = document.getElementById('notification');
const exitBtn = document.getElementById('exit-btn');
const clearBtn = document.getElementById('clear-btn');

// Arreglo para almacenar los items
let listaDeCompras = [];

// Comprobar si hay items guardados en localStorage
if (localStorage.getItem('listaDeCompras')) {
    listaDeCompras = JSON.parse(localStorage.getItem('listaDeCompras'));
    actualizarUI();
}

// Event Listeners
addBtn.addEventListener('click', agregarItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarItem();
    }
});

// Exit button functionality
exitBtn.addEventListener('click', function() {
    window.location.href = 'https://www.google.com';
});

// Clear all items
clearBtn.addEventListener('click', function() {
    if (listaDeCompras.length === 0) {
        mostrarNotificacion('La lista ya está vacía', 'error');
        return;
    }

    if (confirm('¿Estás seguro que deseas borrar toda la lista?')) {
        listaDeCompras = [];
        guardarEnLocalStorage();
        actualizarUI();
        mostrarNotificacion('Lista de compras eliminada', 'success');
    }
});

// Funciones
function agregarItem() {
    const itemText = itemInput.value.trim();

    if (itemText === '') {
        mostrarNotificacion('Por favor, ingresa un producto', 'error');
        return;
    }

    if (listaDeCompras.includes(itemText)) {
        mostrarNotificacion('Este producto ya está en tu lista', 'error');
        return;
    }

    listaDeCompras.push(itemText);
    guardarEnLocalStorage();
    actualizarUI();

    itemInput.value = '';
    itemInput.focus();

    mostrarNotificacion(`¡${itemText} ha sido añadido a la lista!`, 'success');
}

function eliminarItem(index) {
    const itemEliminado = listaDeCompras[index];
    listaDeCompras.splice(index, 1);
    guardarEnLocalStorage();
    actualizarUI();

    mostrarNotificacion(`¡${itemEliminado} ha sido eliminado de la lista!`, 'success');
}

function actualizarUI() {
    // Actualizar contador
    itemsCounter.textContent = listaDeCompras.length;

    // Mostrar mensaje de lista vacía si corresponde
    if (listaDeCompras.length === 0) {
        emptyList.style.display = 'block';
        shoppingList.style.display = 'none';
    } else {
        emptyList.style.display = 'none';
        shoppingList.style.display = 'block';
    }

    // Actualizar la lista de items
    shoppingList.innerHTML = '';

    listaDeCompras.forEach((item, index) => {
        const li = document.createElement('li');

        const spanItem = document.createElement('span');
        spanItem.className = 'item-name';
        spanItem.textContent = item;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.setAttribute('aria-label', 'Eliminar item');
        deleteBtn.onclick = () => eliminarItem(index);

        li.appendChild(spanItem);
        li.appendChild(deleteBtn);
        shoppingList.appendChild(li);

        // Añadir animación con un pequeño retraso según la posición
        setTimeout(() => {
            li.style.opacity = '1';
        }, index * 50);
    });
}

function guardarEnLocalStorage() {
    localStorage.setItem('listaDeCompras', JSON.stringify(listaDeCompras));
}

function mostrarNotificacion(mensaje, tipo) {
    notification.textContent = mensaje;
    notification.className = `notification ${tipo}`;
    notification.classList.add('show');

    // Add slight movement for better visibility
    notification.style.animation = 'notificationBounce 0.5s ease';

    setTimeout(() => {
        notification.classList.remove('show');
        // Reset animation
        setTimeout(() => {
            notification.style.animation = '';
        }, 300);
    }, 3000);
}