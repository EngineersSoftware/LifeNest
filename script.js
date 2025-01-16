document.addEventListener('DOMContentLoaded', () => {
    // Carrusel de Características
    const featuresWrapper = document.querySelector('.features-wrapper');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentSlide = 0;
    const totalSlides = 2; // Número total de slides

    // Función para actualizar estado de botones
    function updateButtonState() {
        // Deshabilitar botón anterior si está en el primer slide
        prevButton.disabled = (currentSlide === 0);
        prevButton.style.opacity = (currentSlide === 0) ? '0.5' : '1';
        prevButton.style.cursor = (currentSlide === 0) ? 'not-allowed' : 'pointer';

        // Deshabilitar botón siguiente si está en el último slide
        nextButton.disabled = (currentSlide === totalSlides - 1);
        nextButton.style.opacity = (currentSlide === totalSlides - 1) ? '0.5' : '1';
        nextButton.style.cursor = (currentSlide === totalSlides - 1) ? 'not-allowed' : 'pointer';
    }

    nextButton.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            featuresWrapper.style.transform = `translateX(-${currentSlide * 50}%)`;
            updateButtonState();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            featuresWrapper.style.transform = `translateX(-${currentSlide * 50}%)`;
            updateButtonState();
        }
    });

    // Inicializar estado de botones
    updateButtonState();

    // Botón de Crear Mascota
    const crearMascotaBtn = document.getElementById('crear-mascota-btn');
    if (crearMascotaBtn) {
        crearMascotaBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Crear Mascota Virtual',
                text: 'Elige el tipo de mascota que quieres crear',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Crear',
                cancelButtonText: 'Cancelar',
                input: 'select',
                inputOptions: {
                    'perro': 'Perro',
                    'gato': 'Gato',
                    'dragon': 'Dragón'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        '¡Mascota Creada!',
                        `Has elegido un ${result.value} como tu compañero virtual.`,
                        'success'
                    );
                    createPet(result.value);
                    startFeeling();
                }
            });
        });
    }

    // Botones principales del título
    // Botones principales del título
    const comenzarBtn = document.querySelector('.hero-cta .btn-primary');
    const saberMasBtn = document.querySelector('.hero-cta .btn-secondary');

    console.log('Comenzar Btn:', comenzarBtn);
    console.log('Saber Más Btn:', saberMasBtn);

    if (comenzarBtn) {
        comenzarBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Comenzar tu Viaje',
                html: `
                    <p>¡Bienvenido a LifeNest!</p>
                    <p>Estamos preparando una experiencia increíble para ti.</p>
                    <p>Próximamente podrás:</p>
                    <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
                        <li>Crear tu perfil</li>
                        <li>Configurar metas</li>
                        <li>Conocer a tu mascota virtual</li>
                    </ul>
                `,
                icon: 'info',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#8eb69b'
            });
        });
    }

    if (saberMasBtn) {
        saberMasBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Más sobre LifeNest',
                html: `
                    <p>LifeNest es más que una aplicación, es tu compañero de productividad.</p>
                    <p>Características principales:</p>
                    <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
                        <li>🗒️ Notas Inteligentes</li>
                        <li>📅 Calendario Integrado</li>
                        <li>🐾 Mascota Virtual</li>
                        <li>🏆 Sistema de Logros</li>
                        <li>👥 Red Social</li>
                    </ul>
                    <p>Transforma tu productividad de una manera divertida y motivadora.</p>
                `,
                icon: 'question',
                confirmButtonText: 'Explorar',
                confirmButtonColor: '#8eb69b'
            });
        });
    }


    // Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validación de campos
            const nombre = contactForm.querySelector('#nombre').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const asunto = contactForm.querySelector('#asunto').value;
            const mensaje = contactForm.querySelector('#mensaje').value.trim();

            // Validaciones
            if (nombre.length < 2) {
                Swal.fire({
                    icon: 'error',
                    title: 'Nombre Inválido',
                    text: 'Por favor, ingresa tu nombre completo'
                });
                return;
            }

            if (!email.includes('@') || email.length < 5) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo Inválido',
                    text: 'Por favor, ingresa un correo electrónico válido'
                });
                return;
            }

            if (asunto === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Asunto Requerido',
                    text: 'Por favor, selecciona un asunto'
                });
                return;
            }

            if (mensaje.length < 10) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mensaje Muy Corto',
                    text: 'Por favor, escribe un mensaje más detallado'
                });
                return;
            }

            // Si pasa todas las validaciones
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje Enviado!',
                text: 'Gracias por contactarnos. Pronto nos pondremos en contacto.',
                showConfirmButton: false,
                timer: 2500
            });

            // Resetear formulario
            contactForm.reset();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cursorCircle = document.createElement('div');
    cursorCircle.classList.add('cursor-circle');
    document.body.appendChild(cursorCircle);

    const cursorDot = document.createElement('div'); // Nuevo elemento para el punto
    cursorDot.classList.add('cursor-dot'); 
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursorCircle.style.left = `${e.pageX}px`;
        cursorCircle.style.top = `${e.pageY}px`;
        
        cursorDot.style.left = `${e.pageX}px`; // Mueve el punto con el cursor
        cursorDot.style.top = `${e.pageY}px`;
    });

    document.addEventListener('mouseleave', () => {
        cursorCircle.style.display = 'none'; 
        cursorDot.style.display = 'none'; // Oculta el punto
    });

    document.addEventListener('mouseenter', () => {
        cursorCircle.style.display = 'block'; 
        cursorDot.style.display = 'block'; // Muestra el punto
    });
});

function createPet(type) {
    const petContainer = document.getElementById('pet-container');
    petContainer.innerHTML = ''; 
    petContainer.style.display = 'flex'; 

    // Crear el círculo para la mascota
    const circle = document.createElement('div');
    circle.classList.add('circle');

    // Crear la imagen según el tipo
    const petImage = document.createElement('img');
    petImage.style.width = '80px'; 
    petImage.style.height = '80px'; 
    petImage.alt = type; 

    // Asignar la fuente de la imagen según el tipo
    if (type === 'perro') {
        petImage.src = 'assets/perro.png'; // Ruta de la imagen del perro
    } else if (type === 'gato') {
        petImage.src = 'assets/gato.png'; // Ruta de la imagen del gato
    } else if (type === 'dragon') {
        petImage.src = 'assets/Dragon.png'; // Ruta de la imagen del dragón
    }

    circle.appendChild(petImage); 
    petContainer.appendChild(circle); 

    // Crear barras
    const hpBar = createBar(petHP, 'hp-bar', 'HP: ' + petHP);
    const foodBar = createBar(petFood, 'food-bar', 'Alimento: ' + petFood);
    const sleepBar = createBar(petSleep, 'sleep-bar', 'Sueño: ' + petSleep);

    petContainer.appendChild(hpBar);
    petContainer.appendChild(foodBar);
    petContainer.appendChild(sleepBar);

    // Botón de alimentar
    const feedButton = document.createElement('button');
    feedButton.innerText = 'Alimentar';
    feedButton.onclick = feedPet;
    petContainer.appendChild(feedButton);
}
function createBar(value, className, label) {
    const barContainer = document.createElement('div');
    barContainer.className = 'bar ' + className;
    barContainer.style.width = value + '%'; // Ajustar el ancho según el valor

    const barLabel = document.createElement('div');
    barLabel.className = 'bar-label';
    barLabel.innerText = label;

    barContainer.appendChild(barLabel);
    return barContainer;
}

function feedPet() {
    if (petFood > 0) {
        petFood -= 5; // Reducir alimento
        createPet(currentPetType); // Volver a crear la mascota para actualizar las barras
    } else {
        alert('No hay suficiente alimento para alimentar a la mascota.');
    }
}

function startFeeding() {
    foodInterval = setInterval(() => {
        if (petFood > 0) {
            petFood -= 5; // Reducir alimento
            createPet(currentPetType); // Actualizar la mascota y las barras
        } else {
            clearInterval(foodInterval); // Detener el intervalo si no hay alimento
            alert('Tu mascota se ha quedado sin alimento.');
        }
    }, 3600000); // 1 hora en milisegundos
}