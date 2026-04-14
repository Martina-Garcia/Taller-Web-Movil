let inventario = [
    { id: 1, nombre: "Arroz Grano Largo 1kg", ubicacion: "Pasillo 4", estado: "Pendiente" },
    { id: 2, nombre: "Manzanas Fuji (Granel)", ubicacion: "Pasillo 8", estado: "Pendiente" }
];

const contenedorLista = document.getElementById("listaProductos");
const formulario = document.getElementById("formularioSustituto");

const renderizarUI = () => {
    contenedorLista.innerHTML = ""; // Limpiar contenedor

    for (const producto of inventario) {
        
        const claseCSS = producto.estado === "Encontrado" ? "estado-encontrado" : "";
        const textoBoton = producto.estado === "Encontrado" ? "Deshacer" : "Marcar Listo";
        const colorBoton = producto.estado === "Encontrado" ? "btn-secondary" : "btn-success";

        contenedorLista.innerHTML += `
            <article class="col-12 col-md-6 mb-3">
                <div class="tarjeta-producto ${claseCSS}">
                    <h3 class="h5">${producto.nombre}</h3>
                    <p class="text-muted mb-2"> ${producto.ubicacion}</p>
                    <p>Estado: <strong>${producto.estado}</strong></p>
                    
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn ${colorBoton} btn-sm w-100 btn-cambiar" data-id="${producto.id}">
                            ${textoBoton}
                        </button>
                        <button class="btn btn-outline-danger btn-sm px-3 btn-eliminar" data-id="${producto.id}">
                            
                        </button>
                    </div>
                </div>
            </article>
        `;
    }
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const inputNombre = document.getElementById("inputNombre").value;
    const inputUbicacion = document.getElementById("inputUbicacion").value;

    const nuevoProducto = {
        id: Date.now(),
        nombre: inputNombre,
        ubicacion: inputUbicacion,
        estado: "Pendiente"
    };

    inventario.push(nuevoProducto);
    renderizarUI();
    formulario.reset();
});
contenedorLista.addEventListener("click", (evento) => {
    
    if (evento.target.classList.contains("btn-cambiar")) {

        const idBuscado = parseInt(evento.target.getAttribute("data-id"));
        
        const producto = inventario.find(p => p.id === idBuscado);
        if (producto) {
            producto.estado = producto.estado === "Pendiente" ? "Encontrado" : "Pendiente";
            renderizarUI();
        }
    }

    if (evento.target.classList.contains("btn-eliminar")) {
        const idBuscado = parseInt(evento.target.getAttribute("data-id"));
        
        if (confirm("¿Eliminar producto?")) {
            inventario = inventario.filter(producto => producto.id !== idBuscado);
            renderizarUI();
        }
    }
});

renderizarUI();