// Elementos del DOM
const userGuessInput = document.getElementById('user-guess');
const guessButton = document.getElementById('guess-btn');
const messageElement = document.getElementById('message');
const modeIndicator = document.getElementById('mode-indicator');
const attemptElements = [
    document.getElementById('attempt-1'),
    document.getElementById('attempt-2'),
    document.getElementById('attempt-3')
];
const restartContainer = document.querySelector('.restart-container');
const restartButton = document.getElementById('restart-btn');
const switchModeButton = document.getElementById('switch-mode-btn');

// Variables del juego
let numeroSecreto;
let intentosRestantes;
let juegoTerminado;
let modoAleatorio = false;

// Función para iniciar/reiniciar el juego
function iniciarJuego() {
    if (modoAleatorio) {
        // Generar número aleatorio entre 0 y 10
        numeroSecreto = Math.floor(Math.random() * 11);
        modeIndicator.textContent = "Modo: Número aleatorio";
    } else {
        // Usar un número predefinido como pide la consigna
        numeroSecreto = 7; // Número predefinido
        modeIndicator.textContent = "Modo: Número predefinido";
    }

    intentosRestantes = 3;
    juegoTerminado = false;

    // Reiniciar la interfaz
    messageElement.innerHTML = "¡Tienes 3 intentos para adivinar!";
    messageElement.className = "";
    userGuessInput.value = "";
    userGuessInput.disabled = false;
    guessButton.disabled = false;
    restartContainer.style.display = "none";

    // Reiniciar los indicadores de intentos
    attemptElements.forEach(el => el.classList.remove('used'));

    // Enfocar el input
    userGuessInput.focus();

    console.log(`Juego iniciado. El número secreto es: ${numeroSecreto} (No lo digas al usuario)`);
}

// Función para verificar el intento del usuario
function verificarIntento() {
    if (juegoTerminado) return;

    // Obtener y validar el número ingresado
    const numeroUsuario = parseInt(userGuessInput.value);
    if (isNaN(numeroUsuario) || numeroUsuario < 0 || numeroUsuario > 10) {
        messageElement.textContent = "Por favor, ingresa un número válido entre 0 y 10.";
        messageElement.className = "error";
        userGuessInput.focus();
        return;
    }

    // Marcar un intento usado
    attemptElements[3 - intentosRestantes].classList.add('used');
    intentosRestantes--;

    // Verificar si adivinó - CORRECCIÓN: Comparar correctamente los números
    console.log(`Comparando: Usuario=${numeroUsuario}, Secreto=${numeroSecreto}`);
    if (numeroUsuario === numeroSecreto) {
        messageElement.textContent = `¡Felicidades! Has adivinado el número ${numeroSecreto}!`;
        messageElement.className = "success";
        terminarJuego(true);
        crearConfeti();
    } else {
        // No adivinó
        if (intentosRestantes > 0) {
            // Todavía tiene intentos
            const pista = numeroUsuario > numeroSecreto ? "demasiado alto" : "demasiado bajo";
            messageElement.textContent = `Número incorrecto (${pista}). Te quedan ${intentosRestantes} intento(s).`;
            messageElement.className = "error";
            userGuessInput.value = "";
            userGuessInput.focus();
        } else {
            // Se acabaron los intentos
            messageElement.textContent = `¡Lo siento! Has agotado tus intentos. El número era ${numeroSecreto}.`;
            messageElement.className = "error";
            terminarJuego(false);
        }
    }

    // Añadir animación de pulso al mensaje
    messageElement.parentElement.classList.add('pulse');
    setTimeout(() => {
        messageElement.parentElement.classList.remove('pulse');
    }, 500);
}

// Función para terminar el juego
function terminarJuego(victoria) {
    juegoTerminado = true;
    userGuessInput.disabled = true;
    guessButton.disabled = true;
    restartContainer.style.display = "block";
}

// Función para cambiar el modo de juego
function cambiarModo() {
    modoAleatorio = !modoAleatorio;
    switchModeButton.textContent = modoAleatorio ?
        "Cambiar a número predefinido" :
        "Cambiar a número aleatorio";
    iniciarJuego();
}

// Función para crear efectos de confeti (solo si gana)
function crearConfeti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);

        const destX = Math.random() * 100 + 'vw';
        const destY = Math.random() * 100 + 'vh';
        const duration = 1 + Math.random() * 2;
        const scale = 0.5 + Math.random();

        confetti.animate([{
            top: '-10px',
            transform: 'scale(0) rotate(0deg)'
        }, {
            transform: `scale(${scale}) rotate(${Math.random() * 360}deg)`,
            top: destY,
            left: destX
        }], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0, 1, 0.8, 1)',
            fill: 'forwards'
        });

        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Eventos
guessButton.addEventListener('click', verificarIntento);
userGuessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verificarIntento();
    }
});
restartButton.addEventListener('click', iniciarJuego);
switchModeButton.addEventListener('click', cambiarModo);

// Iniciar el juego al cargar la página
window.addEventListener('load', iniciarJuego);
