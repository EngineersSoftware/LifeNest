// Configuración global y variables
let mascotaActual = null;

// Función de utilidad para mostrar notificaciones
function mostrarNotificacion(titulo, texto, icono = 'info') {
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 no está cargado');
        return;
    }

    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: 'Aceptar'
    });
}

// Clase MascotaVirtual (asumiendo que ya existe en otro archivo o parte del script)
class MascotaVirtual {
    constructor(nombre, tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.salud = 100;
        this.nivel = 1;
        this.apariencia = {
            color: null,
            accesorio: null
        };
    }

    personalizar(color, accesorio = null) {
        this.apariencia.color = color;
        this.apariencia.accesorio = accesorio;
    }
}

// Función principal de creación de mascota
function crearMascotaInteractiva() {
    console.log('Iniciando creación de mascota interactiva');
    
    let currentStep = 1;
    let mascotaData = {
        tipo: null,
        nombre: '',
        color: null
    };

    const petTypes = [
        { 
            tipo: 'perro', 
            icon: 'pets', 
            description: 'Leal y juguetón, perfecto para aventuras',
            color: '#FF6B6B' 
        },
        { 
            tipo: 'gato', 
            icon: 'cat', 
            description: 'Elegante y independiente, un compañero tranquilo',
            color: '#4ECDC4' 
        }
    ];

    function validateStep() {
        switch(currentStep) {
            case 1: return mascotaData.tipo !== null;
            case 2: 
                return mascotaData.nombre.trim().length >= 2 && 
                       mascotaData.nombre.trim().length <= 15;
            case 3: return mascotaData.color !== null;
            default: return false;
        }
    }

    function mostrarPaso() {
        switch(currentStep) {
            case 1:
                Swal.fire({
                    title: 'Elige el Tipo de Mascota',
                    html: `
                        <div class="mascota-selector">
                            ${petTypes.map(pet => `
                                <div class="mascota-option" data-tipo="${pet.tipo}">
                                    <span class="material-icons" style="color: ${pet.color};">${pet.icon}</span>
                                    <h3>${pet.tipo.charAt(0).toUpperCase() + pet.tipo.slice(1)}</h3>
                                    <p>${pet.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    `,
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    didRender: () => {
                        document.querySelectorAll('.mascota-option').forEach(option => {
                            option.addEventListener('click', (e) => {
                                mascotaData.tipo = e.currentTarget.dataset.tipo;
                                currentStep++;
                                mostrarPaso();
                            });
                        });
                    }
                });
                break;

            case 2:
                Swal.fire({
                    title: 'Nombra a tu Mascota',
                    input: 'text',
                    inputPlaceholder: 'Escribe el nombre de tu mascota',
                    showCancelButton: true,
                    confirmButtonText: 'Siguiente',
                    cancelButtonText: 'Atrás',
                    preConfirm: (nombre) => {
                        if (!nombre || nombre.length < 2 || nombre.length > 15) {
                            Swal.showValidationMessage('El nombre debe tener entre 2 y 15 caracteres');
                            return false;
                        }
                        return nombre;
                    },
                    didRender: () => {
                        const cancelButton = Swal.getCancelButton();
                        cancelButton.addEventListener('click', () => {
                            currentStep--;
                            mostrarPaso();
                        });
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        mascotaData.nombre = result.value;
                        currentStep++;
                        mostrarPaso();
                    }
                });
                break;

            case 3:
                Swal.fire({
                    title: 'Elige el Color de tu Mascota',
                    html: `
                        <div class="color-selector">
                            ${[
                                { color: '#FF6B6B', name: 'Rojo Pasión' },
                                { color: '#4ECDC4', name: 'Verde Menta' },
                                { color: '#45B7D1', name: 'Azul Cielo' },
                                { color: '#FDCB6E', name: 'Amarillo Cálido' },
                                { color: '#6C5CE7', name: 'Púrpura Místico' }
                            ].map(colorOption => `
                                <div 
                                    class="color-option" 
                                    data-color="${colorOption.color}" 
                                    style="background-color: ${colorOption.color};"
                                    title="${colorOption.name}"
                                ></div>
                            `).join('')}
                        </div>
                    `,
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonText: 'Atrás',
                    didRender: () => {
                        document.querySelectorAll('.color-option').forEach(option => {
                            option.addEventListener('click', (e) => {
                                mascotaData.color = e.currentTarget.dataset.color;
                                finalizarCreacionMascota();
                            });
                        });

                        const cancelButton = Swal.getCancelButton();
                        cancelButton.addEventListener('click', () => {
                            currentStep--;
                            mostrarPaso();
                        });
                    }
                });
                break;
        }
    }

    function finalizarCreacionMascota() {
        mascotaActual = new MascotaVirtual(mascotaData.nombre, mascotaData.tipo);
        mascotaActual.personalizar(mascotaData.color);

        Swal.fire({
            title: '¡Mascota Creada!',
            html: `
                <div class="mascota-preview">
                    <div 
                        class="mascota-preview-icon" 
                        style="color: ${mascotaData.color};"
                    >
                        <span class="material-icons" style="font-size: 100px;">
                            ${petTypes.find(p => p.tipo === mascotaData.tipo).icon}
                        </span>
                    </div>
                    <h3>${mascotaData.nombre}</h3>
                    <p>Tipo: ${mascotaData.tipo.charAt(0).toUpperCase() + mascotaData.tipo.slice(1)}</p>
                    <p>Color: ${mascotaData.color}</p>
                    <div class="mascota-stats">
                        <div class="stat">
                            <span class="material-icons">favorite</span>
                            <p>Salud: ${mascotaActual.salud}</p>
                        </div>
                        <div class="stat">
                            <span class="material-icons">star</span>
                            <p>Nivel: ${mascotaActual.nivel}</p>
                        </div>
                    </div>
                </div>
            `,
            icon: 'success',
            confirmButtonText: 'Comenzar Aventura',
            width: '500px'
        });
    }

    // Iniciar proceso de creación
    mostrarPaso();
}

// Evento principal de carga
document.addEventListener('DOMContentLoaded', () => {
    // Verificación de SweetAlert2
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 no está cargado correctamente');
        return;
    }

    // Selección de elementos del DOM
    const crearMascotaBtn = document.getElementById('crear-mascota');

    // Verificación de existencia del botón
    if (!crearMascotaBtn) {
        console.error('No se encontró el botón de crear mascota');
        return;
    }

    // Evento de click para el botón de crear mascota con debugging
    crearMascotaBtn.addEventListener('click', (event) => {
        console.log('Botón de crear mascota clickeado');
        event.stopPropagation(); // Prevenir propagación de eventos
        
        try {
            crearMascotaInteractiva();
        } catch (error) {
            console.error('Error al crear mascota:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo crear la mascota. Intenta de nuevo.',
                icon: 'error'
            });
        }
    });

    // Eventos de sonido y efectos visuales (opcional)
    const hoverSound = new Audio('path/to/hover-sound.mp3');
    const clickSound = new Audio('path/to/click-sound.mp3');

    crearMascotaBtn.addEventListener('mouseenter', () => {
        crearMascotaBtn.classList.add('hover-effect');
        // Descomentar si quieres sonido
        // hoverSound.play();
    });

    crearMascotaBtn.addEventListener('mouseleave', () => {
        crearMascotaBtn.classList.remove('hover-effect');
    });
});