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