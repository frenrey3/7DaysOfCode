// Variables para almacenar los números y operadores
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// Elementos del DOM
const currentOperandDisplay = document.getElementById('current-operand');
const previousOperandDisplay = document.getElementById('previous-operand');

// Función para actualizar la pantalla
function updateDisplay() {
    currentOperandDisplay.textContent = currentOperand;

    if (operation != null) {
        previousOperandDisplay.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandDisplay.textContent = previousOperand;
    }
}

// Función para agregar un número
function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else if (currentOperand.length < 12) { // Límite de caracteres
        currentOperand += number;
    }
    updateDisplay();
}

// Función para agregar un decimal
function appendDecimal() {
    if (shouldResetScreen) {
        currentOperand = '0.';
        shouldResetScreen = false;
        updateDisplay();
        return;
    }

    if (!currentOperand.includes('.')) {
        currentOperand += '.';
        updateDisplay();
    }
}

// Función para agregar un operador
function appendOperator(op) {
    if (currentOperand === '') return;

    if (previousOperand !== '') {
        calculate();
    }

    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

// Función para reiniciar la calculadora
function clearCalculator() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

// Función para borrar el último carácter
function deleteLastChar() {
    if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// Funciones para las operaciones matemáticas
function sumar(numero1, numero2) {
    return numero1 + numero2;
}

function restar(numero1, numero2) {
    return numero1 - numero2;
}

function multiplicar(numero1, numero2) {
    return numero1 * numero2;
}

function dividir(numero1, numero2) {
    if (numero2 === 0) {
        return "Error";
    }
    return numero1 / numero2;
}

function porcentaje(numero1, numero2) {
    return (numero1 * numero2) / 100;
}

// Función para realizar el cálculo
function calculate() {
    if (operation === undefined || shouldResetScreen) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    let result;

    switch (operation) {
        case '+':
            result = sumar(prev, current);
            break;
        case '-':
            result = restar(prev, current);
            break;
        case '×':
            result = multiplicar(prev, current);
            break;
        case '÷':
            result = dividir(prev, current);
            break;
        case '%':
            result = porcentaje(prev, current);
            break;
        default:
            return;
    }

    // Formatear el resultado para mostrar máximo 2 decimales
    if (result.toString().includes('.')) {
        result = Number(result).toFixed(2);
        // Remove trailing zeros
        result = Number(result).toString();
    }

    // Manejar errores de división por cero
    if (result === "Error") {
        currentOperand = "Error";
        previousOperand = "";
        operation = undefined;
    } else {
        currentOperand = result.toString();
        previousOperand = "";
        operation = undefined;
    }

    shouldResetScreen = true;
    updateDisplay();

    // Efecto de animación al calcular
    document.querySelector('.calculator').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.calculator').style.animation = 'pulse 2s ease-in-out infinite';
        document.querySelector('.calculator').style.animationPlayState = 'paused';
    }, 50);
}

// Inicializar la pantalla
updateDisplay();

// Soporte para teclado
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDecimal();
    } else if (event.key === '+') {
        appendOperator('+');
    } else if (event.key === '-') {
        appendOperator('-');
    } else if (event.key === '*') {
        appendOperator('×');
    } else if (event.key === '/') {
        event.preventDefault(); // Prevenir que se abra la búsqueda en algunos navegadores
        appendOperator('÷');
    } else if (event.key === '%') {
        appendOperator('%');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace') {
        deleteLastChar();
    } else if (event.key === 'Delete' || event.key === 'Escape') {
        clearCalculator();
    }
});