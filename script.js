// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Elementos del formulario y la lista
    const form = document.getElementById('formServicio');
    const nombreInput = document.getElementById('nombreServicio');
    const descripcionInput = document.getElementById('descripcionServicio');
    const categoriaSelect = document.getElementById('categoriaServicio');
    const listaServicios = document.getElementById('listaServicios');
    const contadorSpan = document.getElementById('contadorServicios');
    const mensajeVacio = document.getElementById('mensajeVacio');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const btnEliminarTodos = document.getElementById('btnEliminarTodos');

    // Arreglo para almacenar los servicios (opcional, pero útil)
    let servicios = [];

    // Función para actualizar el contador y el mensaje de vacío
    function actualizarContador() {
        const total = servicios.length;
        contadorSpan.textContent = total;

        // Mostrar u ocultar el mensaje de "sin servicios"
        if (total === 0) {
            if (!mensajeVacio) {
                // Si no existe, lo creamos (pero ya existe en el HTML)
                const p = document.createElement('p');
                p.className = 'text-muted';
                p.id = 'mensajeVacio';
                p.textContent = 'Aún no hay servicios registrados.';
                listaServicios.appendChild(p);
            } else {
                mensajeVacio.style.display = 'block';
            }
        } else {
            if (mensajeVacio) {
                mensajeVacio.style.display = 'none';
            }
        }
    }

    // Función para renderizar todos los servicios desde el arreglo
    function renderizarServicios() {
        // Limpiar la lista (pero conservar el mensaje de vacío si existe)
        const items = listaServicios.querySelectorAll('.col-md-6.col-lg-4');
        items.forEach(item => item.remove());

        // Si no hay servicios, mostramos el mensaje
        if (servicios.length === 0) {
            if (!mensajeVacio) {
                const p = document.createElement('p');
                p.className = 'text-muted';
                p.id = 'mensajeVacio';
                p.textContent = 'Aún no hay servicios registrados.';
                listaServicios.appendChild(p);
            } else {
                mensajeVacio.style.display = 'block';
            }
            actualizarContador();
            return;
        }

        // Ocultar mensaje de vacío
        if (mensajeVacio) mensajeVacio.style.display = 'none';

        // Crear una tarjeta para cada servicio
        servicios.forEach((servicio, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 mb-4';

            const card = document.createElement('div');
            card.className = 'card h-100 shadow-sm';

            // Cuerpo de la tarjeta
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

            // Botón eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-danger btn-sm mt-2';
            btnEliminar.textContent = 'Eliminar';
            // Asignamos el evento click con el índice
            btnEliminar.addEventListener('click', function(e) {
                e.stopPropagation();
                eliminarServicio(index);
            });

            // Ensamblar
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

    // Función para agregar un servicio
    function agregarServicio(nombre, descripcion, categoria) {
        const nuevoServicio = {
            nombre: nombre,
            descripcion: descripcion,
            categoria: categoria
        };
        servicios.push(nuevoServicio);
        renderizarServicios();
    }

    // Función para eliminar un servicio por índice
    function eliminarServicio(index) {
        servicios.splice(index, 1);
        renderizarServicios();
        // Mostrar mensaje de validación positivo
        mensajeValidacion.innerHTML = `<div class="alert alert-info">Servicio eliminado correctamente.</div>`;
        setTimeout(() => {
            mensajeValidacion.innerHTML = '';
        }, 3000);
    }

    // Función para eliminar todos los servicios
    function eliminarTodos() {
        if (servicios.length === 0) {
            mensajeValidacion.innerHTML = `<div class="alert alert-warning">No hay servicios para eliminar.</div>`;
            setTimeout(() => {
                mensajeValidacion.innerHTML = '';
            }, 3000);
            return;
        }
        servicios = [];
        renderizarServicios();
        mensajeValidacion.innerHTML = `<div class="alert alert-success">Todos los servicios han sido eliminados.</div>`;
        setTimeout(() => {
            mensajeValidacion.innerHTML = '';
        }, 3000);
    }

    // Evento submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita recarga

        // Obtener valores y eliminar espacios en blanco
        const nombre = nombreInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const categoria = categoriaSelect.value;

        // Validar que no estén vacíos
        if (nombre === '' || descripcion === '' || categoria === '') {
            mensajeValidacion.innerHTML = `<div class="alert alert-danger">Todos los campos son obligatorios. Por favor, completa el formulario.</div>`;
            return;
        }

        // Si todo está bien, agregar el servicio
        agregarServicio(nombre, descripcion, categoria);

        // Limpiar campos del formulario
        nombreInput.value = '';
        descripcionInput.value = '';
        categoriaSelect.value = '';

        // Mostrar mensaje de éxito
        mensajeValidacion.innerHTML = `<div class="alert alert-success">Servicio "${nombre}" añadido correctamente.</div>`;
        setTimeout(() => {
            mensajeValidacion.innerHTML = '';
        }, 3000);
    });

    // Evento para eliminar todos
    btnEliminarTodos.addEventListener('click', eliminarTodos);

    // Inicializar: asegurar que el contador esté en 0 y mensaje de vacío visible
    actualizarContador();
});