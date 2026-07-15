// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Simular carga con Spinner
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('d-none');
    }, 1500);

    // ===== Elementos del DOM =====
    const form = document.getElementById('formServicio');
    const nombreInput = document.getElementById('nombreServicio');
    const descripcionInput = document.getElementById('descripcionServicio');
    const categoriaSelect = document.getElementById('categoriaServicio');
    const contenedorServiciosGrid = document.getElementById('serviciosGrid'); // Para tarjetas en sección Servicios
    const contenedorListaTable = document.getElementById('listaServiciosTable'); // Para tabla en sección Gestión
    const listaVaciaMsg = document.getElementById('listaServiciosVacia');
    const contadorSpan = document.getElementById('contadorServicios');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const btnEliminarTodos = document.getElementById('btnEliminarTodos');
    const btnAñadir = document.getElementById('btnAñadir');

    // ===== Arreglo de servicios (incluye datos iniciales) =====
    let servicios = [
        {
            nombre: 'Auditoría de Seguridad Web',
            descripcion: 'Análisis exhaustivo de vulnerabilidades en tu sitio web para garantizar la máxima protección.',
            categoria: 'Seguridad'
        },
        {
            nombre: 'Instalación de Certificados SSL',
            descripcion: 'Implementación y configuración de certificados HTTPS para cifrar la comunicación de tu sitio.',
            categoria: 'Seguridad'
        },
        {
            nombre: 'Consultoría en Ciberseguridad',
            descripcion: 'Asesoramiento personalizado para mejorar las prácticas de seguridad digital en tu organización.',
            categoria: 'Consultoría'
        }
    ];

    // ===== Funciones de validación individuales (Conservando lógica Semana 6) =====
    function validarNombre() {
        const nombre = nombreInput.value.trim();
        const valido = nombre.length >= 3;
        if (valido) {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
        } else {
            nombreInput.classList.remove('is-valid');
            nombreInput.classList.add('is-invalid');
        }
        return valido;
    }

    function validarDescripcion() {
        const desc = descripcionInput.value.trim();
        const valido = desc.length >= 10;
        if (valido) {
            descripcionInput.classList.remove('is-invalid');
            descripcionInput.classList.add('is-valid');
        } else {
            descripcionInput.classList.remove('is-valid');
            descripcionInput.classList.add('is-invalid');
        }
        return valido;
    }

    function validarCategoria() {
        const categoria = categoriaSelect.value;
        const valido = categoria !== '';
        if (valido) {
            categoriaSelect.classList.remove('is-invalid');
            categoriaSelect.classList.add('is-valid');
        } else {
            categoriaSelect.classList.remove('is-valid');
            categoriaSelect.classList.add('is-invalid');
        }
        return valido;
    }

    function validarFormularioCompleto() {
        const nombreOk = validarNombre();
        const descOk = validarDescripcion();
        const catOk = validarCategoria();
        const todoOk = nombreOk && descOk && catOk;
        btnAñadir.disabled = !todoOk;
        return todoOk;
    }

    // ===== Eventos en tiempo real =====
    nombreInput.addEventListener('input', function() {
        validarNombre();
        validarFormularioCompleto();
        mensajeValidacion.innerHTML = '';
    });
    nombreInput.addEventListener('blur', validarNombre);

    descripcionInput.addEventListener('input', function() {
        validarDescripcion();
        validarFormularioCompleto();
        mensajeValidacion.innerHTML = '';
    });
    descripcionInput.addEventListener('blur', validarDescripcion);

    categoriaSelect.addEventListener('change', function() {
        validarCategoria();
        validarFormularioCompleto();
        mensajeValidacion.innerHTML = '';
    });
    categoriaSelect.addEventListener('blur', validarCategoria);

    // ===== Renderizado de servicios (Mejorado con Bootstrap Cards y Table) =====
    function renderizarServicios() {
        // Limpiar contenedores
        contenedorServiciosGrid.innerHTML = '';
        contenedorListaTable.innerHTML = '';

        if (servicios.length === 0) {
            listaVaciaMsg.classList.remove('d-none');
            contenedorServiciosGrid.innerHTML = '<div class="col-12 text-center text-muted py-4"><p>No hay servicios disponibles.</p></div>';
        } else {
            listaVaciaMsg.classList.add('d-none');
        }

        servicios.forEach((servicio, index) => {
            // 1. Renderizar Tarjetas para la sección "Servicios"
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="card h-100 border-0 shadow-sm hover-shadow transition">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle">${servicio.categoria}</span>
                            <i class="bi bi-shield-check text-success fs-4"></i>
                        </div>
                        <h5 class="card-title fw-bold">${servicio.nombre}</h5>
                        <p class="card-text text-muted small">${servicio.descripcion}</p>
                    </div>
                    <div class="card-footer bg-transparent border-0 pb-3">
                        <button class="btn btn-outline-primary btn-sm w-100" onclick="alert('Detalles de: ${servicio.nombre}')">Ver más</button>
                    </div>
                </div>
            `;
            contenedorServiciosGrid.appendChild(col);

            // 2. Renderizar Filas para la tabla en la sección "Gestión"
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="fw-bold">${servicio.nombre}</div>
                    <div class="small text-muted d-none d-md-block">${servicio.descripcion.substring(0, 40)}...</div>
                </td>
                <td><span class="badge bg-secondary">${servicio.categoria}</span></td>
                <td class="text-end">
                    <button class="btn btn-danger btn-sm" onclick="eliminarServicio(${index})">
                        <i class="bi bi-trash"></i> <span class="d-none d-md-inline">Eliminar</span>
                    </button>
                </td>
            `;
            contenedorListaTable.appendChild(tr);
        });
    }

    // ===== Actualizar contador y renderizar =====
    function actualizarVistas() {
        contadorSpan.textContent = servicios.length;
        renderizarServicios();
    }

    // ===== Funciones de manipulación de datos (Globales para botones dinámicos) =====
    window.eliminarServicio = function(index) {
        const nombre = servicios[index].nombre;
        servicios.splice(index, 1);
        actualizarVistas();
        mostrarAlerta(`Servicio "${nombre}" eliminado correctamente.`, 'info');
    };

    function eliminarTodos() {
        if (servicios.length === 0) {
            mostrarAlerta('No hay servicios para eliminar.', 'warning');
            return;
        }
        if (confirm('¿Estás seguro de que deseas eliminar todos los servicios?')) {
            servicios = [];
            actualizarVistas();
            mostrarAlerta('Todos los servicios han sido eliminados.', 'success');
        }
    }

    // Función para mostrar alertas de Bootstrap
    function mostrarAlerta(mensaje, tipo) {
        mensajeValidacion.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                <i class="bi bi-info-circle me-2"></i> ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        // Auto cerrar alerta después de 4 segundos
        setTimeout(() => {
            const alert = document.querySelector('#mensajeValidacion .alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 4000);
    }

    // ===== Evento submit del formulario =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validarFormularioCompleto()) {
            mostrarAlerta('Por favor, corrige los campos marcados antes de continuar.', 'danger');
            return;
        }

        const nombre = nombreInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const categoria = categoriaSelect.value;

        // Simular proceso de carga con el botón
        btnAñadir.disabled = true;
        btnAñadir.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Añadiendo...';

        setTimeout(() => {
            servicios.push({ nombre, descripcion, categoria });
            actualizarVistas();

            // Limpiar campos
            form.reset();
            nombreInput.classList.remove('is-valid');
            descripcionInput.classList.remove('is-valid');
            categoriaSelect.classList.remove('is-valid');
            
            // Restaurar botón
            btnAñadir.innerHTML = '<i class="bi bi-plus-lg me-2"></i>Añadir Servicio';
            btnAñadir.disabled = true;

            mostrarAlerta(`¡Servicio "${nombre}" añadido con éxito!`, 'success');
        }, 1000);
    });

    // ===== Evento para eliminar todos =====
    btnEliminarTodos.addEventListener('click', eliminarTodos);

    // ===== Inicialización =====
    btnAñadir.disabled = true;
    actualizarVistas();
});
