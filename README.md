# Proyecto Integrador U1 - Avance 4/4: Aplicación de CSS3, diseño responsivo y Bootstrap

Este proyecto es la continuación del Proyecto Integrador de la Unidad 1 de la asignatura Desarrollo de Aplicaciones Web. Se ha actualizado el archivo `index.html` de la Semana 3, incorporando estilos con CSS3, diseño responsivo y componentes de Bootstrap para mejorar la presentación visual, la organización del contenido y la adaptación del sitio web a diferentes tamaños de pantalla.

## Estructura del Proyecto

El proyecto consta de los siguientes archivos:

- `index.html`: El archivo principal que contiene la estructura HTML5 semántica y la integración de Bootstrap y CSS3.
- `style.css`: Un archivo CSS externo que contiene estilos personalizados y una media query para el diseño responsivo.

## Tecnologías Utilizadas

- **HTML5**: Para la estructura semántica del contenido.
- **Bootstrap 5**: Framework CSS para el diseño responsivo y componentes pre-estilizados.
- **CSS3**: Para estilos personalizados y ajustes finos de diseño.

## Implementación

### 1. Integración de Bootstrap

Bootstrap se ha agregado al proyecto mediante CDN en la sección `<head>` del documento `index.html`:

```html
    <!-- Bootstrap CSS via CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <!-- Bootstrap Icons (optional, for social media icons) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
```

### 2. Estructura Semántica y Clases de Bootstrap

Se ha conservado la estructura semántica (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) y se han aplicado clases de Bootstrap para mejorar el diseño y la responsividad:

- **`header`**: Se han utilizado clases como `bg-dark`, `text-white`, `text-center`, `py-4` para un encabezado oscuro y centrado.
- **`nav`**: Se ha implementado un menú de navegación responsivo utilizando `navbar`, `navbar-expand-lg`, `navbar-dark`, `bg-primary`, `navbar-toggler`, `collapse`, `navbar-collapse`, `navbar-nav`, `ms-auto`, `nav-item`, `nav-link`.
- **`main` y `aside`**: Se ha utilizado el sistema de grillas de Bootstrap (`container`, `row`, `col-lg-8`, `col-lg-4`) para organizar el contenido en columnas responsivas.
- **`section`**: Las secciones principales (`#inicio`, `#quienes-somos`, `#servicios`, `#contacto`) han sido estilizadas con `p-4`, `mb-4`, `bg-light`, `rounded`, `shadow-sm`.

### 3. Mejoras Visuales por Sección

- **Sección Inicio**: Se han aplicado clases como `lead` para párrafos destacados y `btn btn-primary` para botones.
- **Sección Quiénes Somos**: Se ha utilizado el sistema de grillas (`row`, `col-md-8`, `col-md-4`) para una distribución ordenada del contenido y la imagen. La imagen es responsiva con `img-fluid` y `rounded`.
- **Sección Servicios / Productos**: Se han implementado **tarjetas de Bootstrap** (`card`, `h-100`, `shadow-sm`, `card-img-top`, `card-body`, `card-title`, `card-text`, `btn btn-primary`) para presentar los servicios de manera atractiva y responsiva con el sistema de grillas (`col-md-6`, `col-lg-4`).
- **Sección Contacto**: Se ha incorporado un formulario utilizando clases de Bootstrap (`form`, `mb-3`, `form-label`, `form-control`, `btn btn-success`). Además, se han agregado botones estilizados para correo y redes sociales con `btn btn-info` y `mx-2`, y se han incluido iconos de Bootstrap Icons.

### 4. Estilos CSS3 Personalizados

El archivo `style.css` contiene estilos personalizados para:

- **Tipografía y colores generales**: `font-family`, `background-color`, `color` para el `body`.
- **Estilos de secciones**: `margin-bottom`, `padding`, `background-color`, `border-radius`, `box-shadow` para las etiquetas `section`.
- **Encabezados**: `color`, `border-bottom`, `padding-bottom`, `margin-bottom` para `h2`.
- **Botones de contacto**: Ajustes de color para los botones con la clase `btn-info`.

### 5. Diseño Responsivo con Media Query

Se ha incluido una media query en `style.css` para adaptar el diseño a pantallas pequeñas (hasta 768px):

```css
@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.2rem;
    }

    .navbar-nav .nav-link {
        padding: 0.5rem 1rem;
    }

    .card-body {
        font-size: 0.9rem;
    }

    .btn {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
    }

    h1 {
        font-size: 1.8rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    p {
        font-size: 0.95rem;
    }
}
```

Esta media query ajusta el tamaño de la fuente de la marca del navbar, el padding de los enlaces de navegación, el tamaño de la fuente del cuerpo de las tarjetas, el padding de los botones, y el tamaño de las fuentes de los encabezados `h1`, `h2` y los párrafos `p` para mejorar la legibilidad en dispositivos móviles.

## Verificación

El sitio web ha sido diseñado para visualizarse correctamente en diferentes tamaños de pantalla (computadora, tablet y celular) gracias a la implementación de Bootstrap y la media query personalizada.

## Avance Semana 5: Funcionalidad Dinámica con JavaScript

Se ha incorporado una sección **"Gestión de Servicios"** que permite:

- Registrar nuevos servicios mediante un formulario (nombre, descripción, categoría).
- Validar que todos los campos estén completos, mostrando mensajes de error.
- Mostrar los servicios registrados en tarjetas estilizadas con Bootstrap.
- Eliminar servicios individualmente o todos a la vez.
- Actualizar automáticamente el contador de servicios.

La lógica está implementada en `script.js` utilizando manipulación del DOM, eventos, y clases de Bootstrap para los elementos creados dinámicamente.

# Proyecto Integrador U2 - Avance 7/16: Uso de plantillas para renderizar contenido dinámico

Este proyecto corresponde a la Semana 7 de la asignatura Desarrollo de Aplicaciones Web. Se ha reorganizado la interfaz simulando una estructura de plantillas (base.html, header, nav, content, aside, footer) y se ha implementado la generación dinámica de contenido utilizando arreglos de JavaScript para representar los datos del proyecto.

## Estructura del Proyecto

- `index.html`: Estructura HTML5 con Bootstrap, secciones semánticas y comentarios que indican los bloques reutilizables para futura integración con Flask.
- `style.css`: Estilos personalizados y media query para diseño responsivo.
- `script.js`: Lógica de validación dinámica, gestión de servicios (CRUD básico) y renderizado parametrizado para mostrar los servicios en dos zonas diferentes.

## Funcionalidades implementadas

- **Datos iniciales** almacenados en un arreglo de objetos (tres servicios predefinidos).
- **Renderizado dinámico** en dos secciones:
  - **"Servicios"**: muestra las tarjetas en modo solo lectura (sin botones de eliminar).
  - **"Gestión"**: muestra las mismas tarjetas pero con botones de eliminar, además del formulario para añadir nuevos servicios.
- **Validaciones en tiempo real** (eventos `input`, `blur`, `change`):
  - Nombre: obligatorio y mínimo 3 caracteres.
  - Descripción: obligatoria y mínimo 10 caracteres.
  - Categoría: obligatoria (selección no vacía).
- **Retroalimentación visual** con clases de Bootstrap (`is-valid`, `is-invalid`, `valid-feedback`, `invalid-feedback`).
- **Botón "Añadir" habilitado/deshabilitado** según la validez global del formulario.
- **Contador** de servicios actualizado en tiempo real (incluye los iniciales).
- **Eliminación individual y masiva** que afecta a ambas vistas.
- **Comentarios en HTML** que identifican los bloques que podrían convertirse en plantillas de Flask (`header`, `nav`, `main content`, `aside`, `footer`).
- **Diseño responsivo** (Bootstrap + media query) que se adapta a computadora, tablet y celular.

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5 (framework CSS)
- JavaScript (DOM, eventos, validaciones, manipulación de arreglos)
