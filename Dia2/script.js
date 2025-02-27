// Función que inicia el desafío
document.querySelector('button').addEventListener('click', startChallenge);
function startChallenge() {
    let nombre, edad, lenguaje;

    // Bucle hasta que se introduzca un nombre válido o el usuario cancele
    do {
        nombre = prompt("¿Cuál es tu nombre?");
        if (nombre === null) {
            alert("Gracias por participar en el desafío!");
            return;
        }
        if (!nombre || !/^[a-zA-Z\s]+$/.test(nombre)) {
            alert("Por favor, introduce un nombre válido (solo letras).");
        }
    } while (!nombre || !/^[a-zA-Z\s]+$/.test(nombre));

    // Bucle hasta que se introduzca una edad válida o el usuario cancele
    do {
        edad = prompt("¿Cuántos años tienes?");
        if (edad === null) {
            alert("Gracias por participar en el desafío!");
            return;
        }
        if (!edad || !/^\d+$/.test(edad)) {
            alert("Por favor, introduce una edad válida (solo números).");
        }
    } while (!edad || !/^\d+$/.test(edad));

    // Bucle hasta que se introduzca un lenguaje válido o el usuario cancele
    do {
        lenguaje = prompt("¿Qué lenguaje de programación estás estudiando?");
        if (lenguaje === null) {
            alert("Gracias por participar en el desafío!");
            return;
        }
        if (!lenguaje || !/^[a-zA-Z\s]+$/.test(lenguaje)) {
            alert("Por favor, introduce un lenguaje válido (solo letras).");
        }
    } while (!lenguaje || !/^[a-zA-Z\s]+$/.test(lenguaje));

    // Muestra el mensaje personalizado
    alert(`Hola ${nombre}, tienes ${edad} años y ya estás aprendiendo ${lenguaje}!`);

    // Ejercicio opcional: Pregunta adicional
    const respuesta = prompt(`¿Te gusta estudiar ${lenguaje}? Responde con el número 1 para SÍ o 2 para NO.`);
    if (respuesta === null) {
        alert("Gracias por participar en el desafío!");
        return;
    }

    // Condicional para mostrar una respuesta según la elección del usuario
    if (respuesta === '1') {
        alert("¡Muy bien! Sigue estudiando y tendrás mucho éxito.");
    } else if (respuesta === '2') {
        alert("Oh, qué pena... ¿Ya intentaste aprender otros lenguajes?");
    } else {
        alert("Por favor, responde con 1 para SÍ o 2 para NO.");
    }

    // Mensaje final
    alert("Gracias por participar en el desafío!");
}

