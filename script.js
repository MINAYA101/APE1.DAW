// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // ===== Elementos del formulario y la lista =====
    const form = document.getElementById('formServicio');
    const nombreInput = document.getElementById('nombreServicio');
    const descripcionInput = document.getElementById('descripcionServicio');
    const categoriaSelect = document.getElementById('categoriaServicio');
    const listaServicios = document.getElementById('listaServicios');
    const contadorSpan = document.getElementById('contadorServicios');
    const mensajeVacio = document.getElementById('mensajeVacio');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const btnEliminarTodos = document.getElementById('btnEliminarTodos');
    const btnAñadir = document.getElementById('btnAñadir');

    // Arreglo para almacenar los servicios
    let servicios = [];

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

    // Validación global (para habilitar/deshabilitar botón)
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
        // Ocultar mensaje general cuando el campo se corrige
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

    // ===== Funciones para manejar los servicios =====
    function actualizarContador() {
        const total = servicios.length;
        contadorSpan.textContent = total;
        if (total === 0) {
            if (mensajeVacio) mensajeVacio.style.display = 'block';
        } else {
            if (mensajeVacio) mensajeVacio.style.display = 'none';
        }
    }

    function renderizarServicios() {
        // Eliminar tarjetas existentes (pero no el mensaje de vacío)
        const items = listaServicios.querySelectorAll('.col-md-6.col-lg-4');
        items.forEach(item => item.remove());

        if (servicios.length === 0) {
            if (mensajeVacio) mensajeVacio.style.display = 'block';
            actualizarContador();
            return;
        }

        if (mensajeVacio) mensajeVacio.style.display = 'none';

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

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-danger btn-sm mt-2';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', function(e) {
                e.stopPropagation();
                eliminarServicio(index);
            });

            cardBody.appendChild(title);
            cardBody.appendChild(desc);
            cardBody.appendChild(categoria);
            cardBody.appendChild(document.createElement('br'));
            cardBody.appendChild(btnEliminar);
            card.appendChild(cardBody);
            col.appendChild(card);
            listaServicios.appendChild(col);
        });

        actualizarContador();
    }

    function agregarServicio(nombre, descripcion, categoria) {
        servicios.push({ nombre, descripcion, categoria });
        renderizarServicios();
    }

    function eliminarServicio(index) {
        servicios.splice(index, 1);
        renderizarServicios();
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
        renderizarServicios();
        mensajeValidacion.innerHTML = `<div class="alert alert-success">Todos los servicios han sido eliminados.</div>`;
        setTimeout(() => mensajeValidacion.innerHTML = '', 3000);
    }

    // ===== Evento submit del formulario =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Re-validar todos los campos por si acaso
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
        btnAñadir.disabled = true; // Deshabilitar hasta que se ingresen nuevos datos

        mensajeValidacion.innerHTML = `<div class="alert alert-success">Servicio "${nombre}" añadido correctamente.</div>`;
        setTimeout(() => mensajeValidacion.innerHTML = '', 3000);
    });

    // ===== Evento para eliminar todos =====
    btnEliminarTodos.addEventListener('click', eliminarTodos);

    // ===== Inicialización =====
    // Deshabilitar botón al inicio
    btnAñadir.disabled = true;
    actualizarContador();
});