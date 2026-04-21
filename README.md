# PickMart — Sistema de Picking 

**PickMart** es una aplicación web responsiva (Single Page Application) desarrollada con HTML, CSS y JavaScript puro (Vanilla JS). Está diseñada para optimizar y gestionar el proceso de preparación de pedidos (*picking*) en tiendas, supermercados o bodegas, facilitando la administración del inventario y guiando a los trabajadores por las rutas más eficientes


##  Características Principales

La aplicación está dividida en varios módulos accesibles desde una barra lateral de navegación:

*  **Dashboard:** Panel de control principal con métricas en tiempo real (pedidos pendientes, en proceso, completados), tabla de pedidos recientes y alertas visuales de productos con bajo stock
*  **Gestión de Productos:** Inventario detallado. Permite crear, editar, buscar y filtrar productos. Cada producto tiene información de código de barras, categoría, stock actual/mínimo y su ubicación exacta (pasillo y estante)
*  **Gestión de Pasillos:** Configuración de la estructura de la tienda. Los pasillos se pueden personalizar con nombres, colores, número de estantes y categorías, lo que resulta vital para el ruteo posterior
*  **Trabajadores:** Administración del equipo de *pickers* y supervisores, controlando sus turnos, roles, datos de contacto y estado operativo
*  **Control de Pedidos:** Módulo para registrar nuevas órdenes de compra. Permite asignar un cliente, dirección, tipo de entrega (retiro/despacho), el trabajador encargado y agregar las líneas de productos necesarios
*  **Lista de Picking Optimizada:** La funcionalidad principal (Core) del sistema. Al seleccionar un pedido, genera una ruta de recolección **agrupada por pasillo y ordenada por estante**
    * Incluye barras de progreso
    * Casillas interactivas para marcar los productos ya recogidos
    * Opción de impresión optimizada para llevar el registro físico


##  Tecnologías Utilizadas

Este proyecto fue construido sin el uso de frameworks pesados:

* **Estructura:** HTML5 semántico
* **Estilos:** CSS3
    * Uso de variables globales (Custom Properties) para paletas de colores y espaciados (`:root`)
    * Sistemas de diseño modernos: **Flexbox** y **CSS Grid**
    * Diseño completamente Responsivo (adaptable a dispositivos móviles y tablets mediante Media Queries)
    * Animaciones y transiciones suaves (`@keyframes`)
* **Lógica y Dinamismo:** JavaScript
    * Manipulación dinámica del DOM
    * Sistema de navegación tipo SPA (Single Page Application) alternando clases `.active`
    * Gestión de estado en memoria (Mock Data)
    * Funciones de búsqueda y filtrado en tiempo real
* **Tipografía e Iconografía:**
    * [Google Fonts](https://fonts.google.com/): *Rajdhani* (títulos/números), *DM Sans* (cuerpo) y *DM Mono* (códigos)
    * [FontAwesome 6.5.0](https://fontawesome.com/): Iconografía de la interfaz



## Estructura del Proyecto

```text
Taller-Web-Movil/
├── index.html        # Estructura principal y plantillas de las vistas (SPA)
├── css/
│   └── styles.css    # Hojas de estilo (variables, layouts, componentes, responsive)
├── js/
│   └── app.js        # Lógica de la aplicación, datos iniciales (mock) y renderizado
└── README.md         # Documentación del proyecto