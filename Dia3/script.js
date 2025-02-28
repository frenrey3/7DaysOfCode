// Variables globales para seguimiento del progreso
let userChoices = {
    area: '',
    technology: '',
    path: '',
    skills: []
};

// Inicializar el juego cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');
    const startSection = document.getElementById('startSection');
    const output = document.getElementById('output');
    const exitStartButton = document.getElementById('exitStartButton');
    const pathVisualization = document.getElementById('pathVisualization');

    // Ocultar el área de visualización de ruta inicialmente
    pathVisualization.style.display = 'none';

    // Eventos
    startButton.addEventListener('click', () => {
        startGame();
    });

    exitStartButton.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    // Función principal para iniciar el juego
    function startGame() {
        startSection.style.display = 'none';  // Hide the start section
        gameArea.style.display = 'flex';       // Show the game area
        pathVisualization.style.display = 'flex'; // Show path
        exitStartButton.style.display = 'inline-block'; // Show the exit button

        // Reset output area and display welcome message
        output.innerHTML = '';
        displayMessage('¡Bienvenido al Camino del Programador! Vamos a descubrir tu ruta ideal.', 'welcome-message');

        // Start the game flow by asking the area question immediately
        askArea();
    }

    // Función para mostrar mensaje en el output
    function displayMessage(message, className = 'message') {
        const messageElement = document.createElement('div');
        messageElement.className = className;
        messageElement.innerHTML = message; // Use innerHTML to render <br>
        output.appendChild(messageElement);

        // Auto-scroll al último mensaje
        output.scrollTop = output.scrollHeight;
    }

    // Función para preguntar sobre el área (Front-End o Back-End)
    function askArea() {
        updatePathVisualization('nodeArea');

        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';

        // Crear la pregunta
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = '¿Quieres seguir hacia el área de Front-End o seguir hacia el área de Back-End?';

        // Crear contenedor de opciones
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        // Crear botones de opciones
        const frontEndButton = createOptionButton('Front-End', () => {
            userChoices.area = 'Front-End';
            questionContainer.remove();
            displayMessage(`Has elegido el área de ${userChoices.area}. ¡Gran elección! Esta área se enfoca en lo que los usuarios ven y con lo que interactúan.`);
            setTimeout(() => askFramework('Front-End'), 1500);
        });

        const backEndButton = createOptionButton('Back-End', () => {
            userChoices.area = 'Back-End';
            questionContainer.remove();
            displayMessage(`Has elegido el área de ${userChoices.area}. ¡Excelente! Esta área se encarga de toda la lógica y procesamiento detrás de las aplicaciones.`);
            setTimeout(() => askFramework('Back-End'), 1500);
        });

        // Añadir elementos al DOM
        optionsContainer.appendChild(frontEndButton);
        optionsContainer.appendChild(backEndButton);
        questionContainer.appendChild(questionText);
        questionContainer.appendChild(optionsContainer);
        output.appendChild(questionContainer);
        output.scrollTop = output.scrollHeight;
    }

    // Función para preguntar sobre el framework/lenguaje según el área
    function askFramework(area) {
        updatePathVisualization('nodeTech');

        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';

        // Configurar pregunta según el área seleccionada
        const questionText = document.createElement('p');
        questionText.className = 'question-text';

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        if (area === 'Front-End') {
            questionText.textContent = '¿Qué framework te gustaría aprender?';

            const reactButton = createOptionButton('React', () => {
                userChoices.technology = 'React';
                questionContainer.remove();
                displayMessage(`Has elegido aprender ${userChoices.technology}. ¡Una de las bibliotecas más populares para crear interfaces de usuario!`);
                setTimeout(askSpecialization, 1500);
            });

            const vueButton = createOptionButton('Vue', () => {
                userChoices.technology = 'Vue';
                questionContainer.remove();
                displayMessage(`Has elegido aprender ${userChoices.technology}. ¡Un framework progresivo y muy intuitivo para construir interfaces!`);
                setTimeout(askSpecialization, 1500);
            });

            optionsContainer.appendChild(reactButton);
            optionsContainer.appendChild(vueButton);
        } else {
            questionText.textContent = '¿Qué lenguaje te gustaría aprender?';

            const csharpButton = createOptionButton('C#', () => {
                userChoices.technology = 'C#';
                questionContainer.remove();
                displayMessage(`Has elegido aprender ${userChoices.technology}. ¡Un lenguaje versátil desarrollado por Microsoft!`);
                setTimeout(askSpecialization, 1500);
            });

            const javaButton = createOptionButton('Java', () => {
                userChoices.technology = 'Java';
                questionContainer.remove();
                displayMessage(`Has elegido aprender ${userChoices.technology}. ¡Un lenguaje potente y multiplataforma!`);
                setTimeout(askSpecialization, 1500);
            });

            optionsContainer.appendChild(csharpButton);
            optionsContainer.appendChild(javaButton);
        }

        questionContainer.appendChild(questionText);
        questionContainer.appendChild(optionsContainer);
        output.appendChild(questionContainer);
        output.scrollTop = output.scrollHeight;
    }

    // Función para preguntar sobre la especialización
    function askSpecialization() {
        updatePathVisualization('nodeCareer');

        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';

        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = '¿Quieres seguir especializándote en el área elegida o desarrollarte para convertirte en Fullstack?';

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        const specializationButton = createOptionButton('Especializarme', () => {
            userChoices.path = 'Especialización';
            questionContainer.remove();
            displayMessage(`Has decidido especializarte en ${userChoices.area} con ${userChoices.technology}. ¡La especialización profunda te convertirá en un experto muy valorado!`);
            setTimeout(askTechnologies, 1500);
        });

        const fullstackButton = createOptionButton('Fullstack', () => {
            userChoices.path = 'Fullstack';
            questionContainer.remove();
            displayMessage(`Has decidido convertirte en Fullstack. ¡Excelente! Podrás trabajar en ambos lados del desarrollo y entender todo el ecosistema.`);
            setTimeout(askTechnologies, 1500);
        });

        optionsContainer.appendChild(specializationButton);
        optionsContainer.appendChild(fullstackButton);
        questionContainer.appendChild(questionText);
        questionContainer.appendChild(optionsContainer);
        output.appendChild(questionContainer);
        output.scrollTop = output.scrollHeight;
    }

    // Función para preguntar sobre tecnologías adicionales
    function askTechnologies() {
        updatePathVisualization('nodeSkills');

        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';

        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = '¿Hay alguna otra tecnología que te gustaría aprender?';

        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-input';
        input.placeholder = 'Escribe una tecnología o "no" para terminar';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Enviar';
        submitButton.className = 'submit-button';

        // Manejar evento de envío
        const handleSubmit = () => {
            const technology = input.value.trim();

            if (!technology) {
                return; // No hacer nada si el campo está vacío
            }

            if (technology.toLowerCase() === 'no') {
                questionContainer.remove();
                finishGame();
                return;
            }

            userChoices.skills.push(technology);
            input.value = '';

            // Determinar mensaje personalizado según la tecnología
            let message = `¡${technology} es una gran elección!`;

            // Mensajes personalizados para tecnologías comunes
            const techMessages = {
                'javascript': '¡JavaScript es el lenguaje fundamental de la web! Excelente elección.',
                'python': 'Python es increíblemente versátil y fácil de aprender. ¡Gran elección!',
                'typescript': 'TypeScript añade tipado estático a JavaScript, lo que ayuda a prevenir errores. ¡Muy útil!',
                'node.js': 'Node.js te permitirá usar JavaScript en el servidor. ¡Perfecto para desarrollo full-stack!',
                'angular': 'Angular es un framework completo para aplicaciones web. ¡Buena elección!',
                'react native': 'React Native te permitirá crear aplicaciones móviles con tus conocimientos de React.',
                'flutter': 'Flutter es excelente para desarrollo móvil multiplataforma con interfaces bonitas.',
                'docker': 'Docker revolucionará tu forma de desplegar aplicaciones. ¡Tecnología esencial!',
                'aws': 'AWS es el proveedor de servicios en la nube más utilizado. ¡Habilidad muy demandada!',
                'sql': 'SQL es fundamental para trabajar con bases de datos relacionales.',
                'mongodb': 'MongoDB es una de las bases de datos NoSQL más populares.',
                'git': 'Git es esencial para el control de versiones y trabajo en equipo.'
            };

            // Buscar coincidencias parciales para tecnologías
            for (const [tech, techMessage] of Object.entries(techMessages)) {
                if (technology.toLowerCase().includes(tech)) {
                    message = techMessage;
                    break;
                }
            }

            displayMessage(message);
        };

        submitButton.addEventListener('click', handleSubmit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        });

        inputContainer.appendChild(input);
        inputContainer.appendChild(submitButton);
        questionContainer.appendChild(questionText);
        questionContainer.appendChild(inputContainer);
        output.appendChild(questionContainer);
        output.scrollTop = output.scrollHeight;
    }

    // Función para finalizar el juego
    function finishGame() {
        // Mostrar resumen de elecciones
        displayMessage('¡Gracias por completar el Camino del Programador!', 'welcome-message');

        setTimeout(() => {
            displayMessage(`Tu camino elegido es: ${userChoices.area} con ${userChoices.technology}, desarrollándote como ${userChoices.path}.`);

            if (userChoices.skills.length > 0) {
                displayMessage(`Tecnologías adicionales que te interesan: ${userChoices.skills.join(', ')}`);
            }

            // Mostrar mensaje personalizado según las elecciones
            let finalMessage = '';

            if (userChoices.area === 'Front-End' && userChoices.path === 'Especialización') {
                finalMessage = 'Te convertirás en un experto de interfaces y experiencia de usuario. ¡Las empresas valoran mucho estos conocimientos especializados!';
            } else if (userChoices.area === 'Back-End' && userChoices.path === 'Especialización') {
                finalMessage = 'Como especialista en Back-End, serás vital para construir sistemas robustos y escalables. ¡Una habilidad muy demandada!';
            } else if (userChoices.path === 'Fullstack') {
                finalMessage = 'Como desarrollador Fullstack, tendrás una visión completa del desarrollo web. ¡Serás versátil y podrás trabajar en cualquier parte del proyecto!';
            }

            displayMessage(finalMessage);

            // Botón para reiniciar
            setTimeout(() => {
                const restartButton = document.createElement('button');
                restartButton.textContent = 'Iniciar Nuevo Camino';
                restartButton.className = 'primary-button';
                restartButton.style.display = 'inline-block';

                // Crear y mostrar el botón de Salir en la zona de output
                const outputExitButton = document.createElement('button');
                outputExitButton.textContent = 'Salir';
                outputExitButton.className = 'primary-button';
                outputExitButton.style.marginLeft = '20px';  // Add some margin between the buttons
                outputExitButton.style.display = 'inline-block'; // Display inline so they are side-by-side

                restartButton.addEventListener('click', () => {
                    resetGame();
                });

                outputExitButton.addEventListener('click', () => {
                    window.location.href = 'https://www.google.com';
                });

                // Create a container for the buttons
                const buttonContainer = document.createElement('div');
                buttonContainer.style.textAlign = 'center'; // Center the buttons horizontally
                buttonContainer.appendChild(restartButton);
                buttonContainer.appendChild(outputExitButton);

                document.getElementById('output').appendChild(buttonContainer);
            }, 1500);
        }, 1000);
    }

    // Función para reiniciar el juego
    function resetGame() {
        userChoices = {
            area: '',
            technology: '',
            path: '',
            skills: []
        };

        output.innerHTML = '';
        gameArea.style.display = 'none';
        startSection.style.display = 'flex';
        pathVisualization.style.display = 'none';
        exitStartButton.style.display = 'inline-block';  // Show the exit button on the start screen
        startButton.style.display = 'inline-block';

        // Reset path visualization styles
        const allNodes = document.querySelectorAll('.path-node');
        const allArrows = document.querySelectorAll('.path-arrow');

        allNodes.forEach(node => {
            node.classList.remove('active', 'completed');
        });

        allArrows.forEach(arrow => {
            arrow.classList.remove('completed');
        });
    }

    // Función auxiliar para crear un botón de opción
    function createOptionButton(text, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'option-button';
        button.addEventListener('click', clickHandler);
        return button;
    }

    // Función para actualizar la visualización de la ruta
    function updatePathVisualization(activeNodeId) {
        // Resetear todos los nodos
        const allNodes = document.querySelectorAll('.path-node');
        const allArrows = document.querySelectorAll('.path-arrow');

        allNodes.forEach(node => {
            node.classList.remove('active', 'completed');
        });

        allArrows.forEach(arrow => {
            arrow.classList.remove('completed');
        });

        // Marcar nodos y flechas como completados según la etapa actual
        const nodeOrder = ['nodeStart', 'nodeArea', 'nodeTech', 'nodeCareer', 'nodeSkills'];
        const activeIndex = nodeOrder.indexOf(activeNodeId);

        for (let i = 0; i < nodeOrder.length; i++) {
            const node = document.getElementById(nodeOrder[i]);

            if (i < activeIndex) {
                node.classList.add('completed');
                // Marcar la flecha después de este nodo como completada
                if (i < nodeOrder.length - 1) {
                    const nextArrow = node.nextElementSibling;
                    if (nextArrow && nextArrow.classList.contains('path-arrow')) {
                        nextArrow.classList.add('completed');
                    }
                }
            } else if (i === activeIndex) {
                node.classList.add('active');
            }
        }
    }
});