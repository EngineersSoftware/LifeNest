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

    // Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            Swal.fire(
                '¡Mensaje Enviado!',
                'Gracias por contactarnos. Pronto nos pondremos en contacto.',
                'success'
            );
            contactForm.reset();
        });
    }
});