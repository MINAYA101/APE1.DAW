// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // ===== Elementos del DOM =====
    const form = document.getElementById('formServicio');
    const nombreInput = document.getElementById('nombreServicio');
    const descripcionInput = document.getElementById('descripcionServicio');
    const categoriaSelect = document.getElementById('categoriaServicio');
    const contenedorServicios = document.getElementById('serviciosGrid');   // Para vista de solo lectura
    const contenedorGestion = document.getElementById('listaServicios');    // Para vista con botones
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

    // ===== Funciones de validación individuales =====
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

    // ===== Renderizado de servicios (parametrizado) =====
    function renderizarServicios(contenedor, mostrarBotones = false) {
        // Limpiar el contenedor
        contenedor.innerHTML = '';

        if (servicios.length === 0) {
            // Mostrar mensaje de vacío
            const p = document.createElement('p');
            p.className = 'text-muted';
            p.textContent = 'Aún no hay servicios registrados.';
            contenedor.appendChild(p);
            return;
        }

        // Crear una tarjeta para cada servicio
        servicios.forEach((servicio, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 mb-4';

            const card = document.createElement('div');
            card.className = 'card h-100 shadow-sm';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = servicio.nombre;

            const desc = document.createElement('p');
            desc.className = 'card-text';
            desc.textContent = servicio.descripcion;

            const categoria = document.createElement('span');
            categoria.className = 'badge bg-secondary me-2';
            categoria.textContent = servicio.categoria;

            // Si se solicitan botones de eliminar, los añadimos
            if (mostrarBotones) {
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-danger btn-sm mt-2';
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    eliminarServicio(index);
                });
                cardBody.appendChild(btnEliminar);
            }

            // Ensamblar
            cardBody.appendChild(title);
            cardBody.appendChild(desc);
            cardBody.appendChild(categoria);
            cardBody.appendChild(document.createElement('br'));
            card.appendChild(cardBody);
            col.appendChild(card);
            contenedor.appendChild(col);
        });
    }

    // ===== Actualizar contador y renderizar ambas vistas =====
    function actualizarVistas() {
        // Actualizar contador
        contadorSpan.textContent = servicios.length;

        // Renderizar en la sección "Servicios" (solo lectura)
        renderizarServicios(document.getElementById('serviciosGrid'), false);

        // Renderizar en la sección "Gestión" (con botones)
        renderizarServicios(document.getElementById('listaServicios'), true);
    }

    // ===== Funciones de manipulación de datos =====
    function agregarServicio(nombre, descripcion, categoria) {
        servicios.push({ nombre, descripcion, categoria });
        actualizarVistas();
    }

    function eliminarServicio(index) {
        servicios.splice(index, 1);
        actualizarVistas();
        mensajeValidacion.innerHTML = `<div class="alert alert-info">Servicio eliminado correctamente.</div>`;
        setTimeout(() => mensajeValidacion.innerHTML = '', 3000);
    }

    function eliminarTodos() {
        if (servicios.length === 0) {
            mensajeValidacion.innerHTML = `<div class="alert alert-warning">No hay servicios para eliminar.</div>`;
            setTimeout(() => mensajeValidacion.innerHTML = '', 3000);
            return;
        }
        servicios = [];
        actualizarVistas();
        mensajeValidacion.innerHTML = `<div class="alert alert-success">Todos los servicios han sido eliminados.</div>`;
        setTimeout(() => mensajeValidacion.innerHTML = '', 3000);
    }

    // ===== Evento submit del formulario =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Re-validar todos los campos
        const nombreOk = validarNombre();
        const descOk = validarDescripcion();
        const catOk = validarCategoria();
        const todoOk = nombreOk && descOk && catOk;

        if (!todoOk) {
            mensajeValidacion.innerHTML = `<div class="alert alert-danger">Corrige los campos marcados en rojo antes de añadir.</div>`;
            return;
        }

        const nombre = nombreInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const categoria = categoriaSelect.value;

        agregarServicio(nombre, descripcion, categoria);

        // Limpiar campos y quitar clases de validación
        nombreInput.value = '';
        descripcionInput.value = '';
        categoriaSelect.value = '';
        nombreInput.classList.remove('is-valid', 'is-invalid');
        descripcionInput.classList.remove('is-valid', 'is-invalid');
        categoriaSelect.classList.remove('is-valid', 'is-invalid');
        btnAñadir.disabled = true;

        mensajeValidacion.innerHTML = `<div class="alert alert-success">Servicio "${nombre}" añadido correctamente.</div>`;
        setTimeout(() => mensajeValidacion.innerHTML = '', 3000);
    });

    // ===== Evento para eliminar todos =====
    btnEliminarTodos.addEventListener('click', eliminarTodos);

    // ===== Inicialización =====
    btnAñadir.disabled = true; // Comienza deshabilitado
    actualizarVistas();        // Renderiza los servicios iniciales
});